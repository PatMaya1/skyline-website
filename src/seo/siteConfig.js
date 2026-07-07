// Configuración central de SEO del sitio.
// Cambia SITE_URL aquí si el dominio de producción cambia.
export const SITE_URL = 'https://skylineit.mx';
export const SITE_NAME = 'Skyline IT';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const ORG_ID = `${SITE_URL}/#organization`;

// Devuelve una URL absoluta y canónica a partir de un path ("/planes" -> "https://skylineit.mx/planes")
export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = `/${String(path).replace(/^\/+/, '')}`;
  // Normaliza: sin barra final salvo la raíz
  const normalized = clean !== '/' ? clean.replace(/\/+$/, '') : '/';
  return `${SITE_URL}${normalized}`;
}

// Migas de pan (BreadcrumbList) reutilizable
export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
