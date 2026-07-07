/**
 * Prerender estático post-build.
 *
 * Renderiza cada ruta en un navegador headless (Chrome ya instalado) y guarda
 * el HTML resultante en dist/<ruta>/index.html. Así los crawlers y los scrapers
 * de redes sociales (WhatsApp, LinkedIn, Facebook, X) reciben el título, la
 * descripción, el canonical, las Open Graph tags y el JSON-LD ya "horneados"
 * sin depender de ejecutar JavaScript.
 *
 * Se usa Chrome headless (no SSR con renderToString) porque la app incluye
 * componentes que dependen de APIs del navegador (reCAPTCHA), que romperían un
 * render del lado del servidor.
 *
 * Si no se encuentra Chrome (p. ej. en un CI Linux sin navegador) el script
 * avisa y termina sin error: el sitio sigue funcionando como SPA.
 */
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import net from 'node:net';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');
const PORT = 4183;
const ORIGIN = `http://localhost:${PORT}`;

// Rutas estáticas a prerenderizar (las dinámicas /casos/:id caen al SPA)
const ROUTES = [
  '/',
  '/planes',
  '/casos/sneaker-repair',
  '/casos/direct-steel',
];

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/microsoft-edge',
  ];
  return candidates.find((p) => existsSync(p)) || null;
}

function waitForServer(port, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolvePromise, reject) => {
    const tryConnect = () => {
      const socket = net.createConnection(port, 'localhost');
      socket.on('connect', () => {
        socket.destroy();
        resolvePromise();
      });
      socket.on('error', () => {
        socket.destroy();
        if (Date.now() - start > timeoutMs) reject(new Error('Timeout esperando al servidor de preview'));
        else setTimeout(tryConnect, 200);
      });
    };
    tryConnect();
  });
}

function renderRoute(chrome, url) {
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--virtual-time-budget=6000',
    '--run-all-compositor-stages-before-draw',
    '--dump-dom',
    url,
  ];
  const res = spawnSync(chrome, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0 || !res.stdout) {
    throw new Error(`Chrome falló para ${url}: ${res.stderr?.slice(0, 400) || 'sin salida'}`);
  }
  let html = res.stdout;
  if (!/^<!doctype/i.test(html.trimStart())) {
    html = `<!doctype html>\n${html}`;
  }
  return html;
}

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.warn('[prerender] No existe dist/index.html — ejecuta "vite build" primero. Omitiendo.');
    return;
  }

  const chrome = findChrome();
  if (!chrome) {
    console.warn('[prerender] No se encontró Chrome/Chromium. Se omite el prerender (el sitio funciona como SPA). Define CHROME_PATH para habilitarlo.');
    return;
  }

  // Servidor de preview (vite preview hace fallback SPA para todas las rutas)
  const preview = spawn(
    process.execPath,
    [join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js'), 'preview', '--port', String(PORT), '--strictPort'],
    { cwd: ROOT, stdio: 'ignore' },
  );

  // Se renderiza TODO en memoria antes de escribir. Si escribiéramos
  // dist/index.html a mitad del proceso, vite preview lo serviría como fallback
  // SPA para las rutas siguientes y contaminaría su <head> con el meta de home.
  const rendered = [];
  try {
    await waitForServer(PORT);

    for (const route of ROUTES) {
      const url = `${ORIGIN}${route}`;
      try {
        const html = renderRoute(chrome, url);
        rendered.push({ route, html });
      } catch (err) {
        console.warn(`[prerender] ✗ ${route}: ${err.message}`);
      }
    }
  } finally {
    preview.kill('SIGTERM');
  }

  for (const { route, html } of rendered) {
    const outDir = route === '/' ? DIST : join(DIST, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html, 'utf8');
    console.log(`[prerender] ✓ ${route} → ${join(outDir.replace(ROOT + '/', ''), 'index.html')} (${(html.length / 1024).toFixed(0)} KB)`);
  }

  console.log(`[prerender] Listo: ${rendered.length}/${ROUTES.length} rutas prerenderizadas.`);
}

main().catch((err) => {
  console.warn(`[prerender] Error no fatal: ${err.message}`);
});
