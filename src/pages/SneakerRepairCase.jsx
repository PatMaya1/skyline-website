import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Ticket, MessageSquare, Eye, BarChart3 } from 'lucide-react';
import HomeHeader from '../components/home/HomeHeader';
import HomeFooter from '../components/home/HomeFooter';
import sneakerHero from '../assets/sneaker_repair_landing.png';

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function ImagePlaceholder({ children, className = '' }) {
  return (
    <div className={`bg-navy/[0.04] border-2 border-dashed border-navy/10 flex items-center justify-center p-8 text-center ${className}`}>
      <p className="text-navy/30 text-sm leading-relaxed max-w-md italic">
        {children}
      </p>
    </div>
  );
}

function SectionDivider() {
  return <div className="w-16 h-px bg-navy/10 mx-auto my-16 md:my-24" />;
}

const sprintData = [
  { sprints: '1–2', label: 'Núcleo del sistema', desc: 'Check-in digital, cola de trabajo, priorización automática' },
  { sprints: '3–4', label: 'Comunicación automatizada', desc: 'WhatsApp integrado, notificaciones por etapa' },
  { sprints: '5–6', label: 'Portal y analítica', desc: 'Rastreo en tiempo real, dashboard operativo' },
  { sprints: '7–8', label: 'Optimización y lanzamiento', desc: 'Programa de lealtad, alertas, refinamiento' },
];

const afterSteps = ['Check-in digital', 'Priorización automática', 'WhatsApp automático', 'Rastreo en portal', 'Entrega a tiempo', 'Datos al dashboard'];

const snapshotInfo = [
  { label: 'Cliente', value: 'Sneaker Repair (Iker Mendoza, Fundador)' },
  { label: 'Industria', value: 'Servicios / Restauración de calzado' },
  { label: 'Duración', value: '16 semanas, 8 sprints' },
  { label: 'Entregables', value: 'Sistema de tickets, WhatsApp automatizado, Portal de rastreo, Dashboard analítico' },
];

const metrics = [
  { value: '100%', label: 'Visibilidad operativa en tiempo real' },
  { value: '0', label: 'Pares extraviados desde implementación' },
  { value: '16 sem', label: 'De idea a producción' },
];

const features = [
  { icon: Ticket, title: 'Sistema inteligente de tickets', desc: 'Check-in digital, priorización automática, fechas de entrega calculadas por capacidad real. Ningún par se pierde.' },
  { icon: MessageSquare, title: 'WhatsApp automatizado', desc: 'Notificaciones en cada etapa sin intervención manual. Campañas de lealtad, cumpleaños y promociones configurables.' },
  { icon: Eye, title: 'Portal de rastreo', desc: 'Termómetro visual estilo Domino\'s. El cliente rastrea su orden en tiempo real desde el celular.' },
  { icon: BarChart3, title: 'Dashboard analítico', desc: 'Órdenes, ingresos por servicio, capacidad, top clientes y alertas automáticas cuando la demanda se acerca al límite.' },
];

const compareData = [
  { dim: 'Registro de pedidos', before: 'Libreta manual', after: 'Ticket digital con priorización automática' },
  { dim: 'Comunicación con cliente', before: 'WhatsApp reactivo, manual', after: 'Notificaciones automáticas por etapa' },
  { dim: 'Rastreo de órdenes', before: 'Búsqueda física en taller', after: 'Portal web con termómetro en tiempo real' },
  { dim: 'Visibilidad operativa', before: 'Ninguna', after: 'Dashboard con métricas, alertas y tendencias' },
  { dim: 'Entregas a tiempo', before: 'Sin certeza', after: 'Fechas calculadas por capacidad real' },
  { dim: 'Datos para decisiones', before: 'Cero', after: 'Ingresos por servicio, top clientes, capacidad' },
];

export default function SneakerRepairCase() {
  return (
    <div className="bg-page min-h-screen">
      <HomeHeader />

      {/* ── 1. Hero ── */}
      <div className="w-full h-[340px] md:h-[480px] relative overflow-hidden">
        <img
          src={sneakerHero}
          alt="Sneaker Repair"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1076px] mx-auto px-4 xl:px-0 w-full pb-10 md:pb-14">
            <motion.div {...fade}>
              <span className="bg-accent text-white text-sm font-medium px-3 py-1 inline-block mb-4">
                Servicios | Restauración de calzado
              </span>
              <h1 className="text-white font-semibold text-2xl md:text-[44px] leading-tight max-w-3xl">
                De libretas y caos a control total en 16 semanas
              </h1>
              <p className="text-white/70 text-lg md:text-xl mt-4 max-w-2xl">
                Sneaker Repair × Skyline IT Consulting
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── 2. Snapshot Box ── */}
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0 -mt-6 relative z-10">
        <motion.div
          className="bg-white shadow-sm p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Info grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-navy/5">
            {snapshotInfo.map((item) => (
              <div key={item.label}>
                <p className="text-navy/40 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-navy font-medium text-sm leading-snug">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Bold metrics */}
          <div className="grid grid-cols-3 gap-6 text-center">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="text-accent font-bold text-3xl md:text-[48px] leading-none mb-2">{m.value}</p>
                <p className="text-navy/50 text-xs md:text-sm leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Article Body ── */}
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0 py-12 md:py-20">
        {/* Back link */}
        <Link
          to="/#casos"
          className="inline-flex items-center gap-2 text-navy/60 hover:text-navy transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a casos de éxito</span>
        </Link>

        {/* ── 3. El desafío ── */}
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <motion.div className="col-span-12 md:col-span-7" {...fade}>
            <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-6">El desafío</h2>
            <div className="flex flex-col gap-4 text-navy/60 leading-relaxed">
              <p>
                Iker Mendoza construyó Sneaker Repair desde cero — de limpiar tenis entre conocidos a un negocio real con clientes recurrentes y un equipo en crecimiento. Pero con la demanda llegó el caos.
              </p>
              <p>
                Los pedidos se registraban en libretas. Los clientes preguntaban por WhatsApp cuándo estarían listos sus tenis y nadie tenía respuesta clara. El equipo perdía tiempo buscando pares en el taller. Al final del mes, Iker no sabía cuánto había ganado por servicio, quiénes eran sus mejores clientes, ni si su capacidad daba para más.
              </p>
              <p>
                Cuando nos contactó, no pidió "un sistema". Dijo: <strong className="text-navy">"ya no puedo seguir así"</strong>. Nos sentamos con él, recorrimos su taller, y entendimos que el problema no era tecnológico — era operativo. La tecnología iba a ser la herramienta, pero primero necesitábamos entender el negocio a fondo.
              </p>
            </div>
          </motion.div>
          <motion.div className="col-span-12 md:col-span-5" {...fade}>
            <ImagePlaceholder className="h-full min-h-[240px]">
              Fotografía: libreta con anotaciones, mensajes de WhatsApp acumulados, desorden controlado en el taller.
            </ImagePlaceholder>
          </motion.div>
        </div>

        <SectionDivider />

        {/* ── 4. La solución ── */}
        <motion.div {...fade}>
          <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-4">La solución</h2>
          <p className="text-navy/60 leading-relaxed mb-8">
            Diseñamos un plan de 16 semanas en 8 sprints. Cada dos semanas Iker veía avances reales y nos daba retroalimentación. Nada se desarrolló en un vacío.
          </p>
        </motion.div>

        {/* Sprint timeline */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" {...fade}>
          {sprintData.map((s, i) => (
            <div key={i} className="bg-white p-5 border-t-[3px] border-accent">
              <p className="text-accent font-bold text-sm mb-1">Sprint {s.sprints}</p>
              <p className="text-navy font-semibold text-sm mb-2">{s.label}</p>
              <p className="text-navy/50 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Feature grid + dashboard image side by side */}
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <motion.div className="col-span-12 md:col-span-7 grid grid-cols-1 gap-4" {...fade}>
            {features.map((f) => (
              <div key={f.title} className="bg-white p-6 flex gap-4">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-navy font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-navy/50 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div className="col-span-12 md:col-span-5" {...fade}>
            <ImagePlaceholder className="h-full min-h-[300px]">
              Mockup del dashboard: gráfica de tendencia de órdenes, métricas clave, alerta de capacidad visible.
            </ImagePlaceholder>
          </motion.div>
        </div>

        <SectionDivider />

        {/* ── 5. Antes vs. Después ── */}
        <motion.div {...fade}>
          <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-6">Antes vs. Después</h2>
        </motion.div>

        {/* Comparison table — desktop */}
        <motion.div className="bg-white shadow-sm overflow-hidden mb-8 hidden md:block" {...fade}>
          <div className="grid grid-cols-[1fr_1fr_1fr]">
            {/* Header row */}
            <div className="p-4 bg-navy/[0.02] border-b border-navy/5" />
            <div className="p-4 border-b border-navy/5">
              <p className="text-navy/40 text-xs uppercase tracking-wider font-medium">Antes</p>
            </div>
            <div className="p-4 border-b border-navy/5">
              <p className="text-accent text-xs uppercase tracking-wider font-medium">Después</p>
            </div>

            {/* Data rows */}
            {compareData.map((row, i) => (
              <div key={row.dim} className="contents">
                <div className={`p-4 text-navy font-medium text-sm ${i < compareData.length - 1 ? 'border-b border-navy/5' : ''}`}>
                  {row.dim}
                </div>
                <div className={`p-4 bg-navy/[0.02] text-navy/50 text-sm ${i < compareData.length - 1 ? 'border-b border-navy/5' : ''}`}>
                  {row.before}
                </div>
                <div className={`p-4 bg-accent/[0.04] text-accent text-sm font-medium ${i < compareData.length - 1 ? 'border-b border-navy/5' : ''}`}>
                  {row.after}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comparison cards — mobile */}
        <motion.div className="flex flex-col gap-4 mb-8 md:hidden" {...fade}>
          {compareData.map((row) => (
            <div key={row.dim} className="bg-white p-4">
              <p className="text-navy font-medium text-sm mb-3">{row.dim}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-navy/[0.04] p-3">
                  <p className="text-navy/30 text-[10px] uppercase tracking-wider mb-1">Antes</p>
                  <p className="text-navy/50 text-sm">{row.before}</p>
                </div>
                <div className="bg-accent/[0.06] p-3">
                  <p className="text-accent/60 text-[10px] uppercase tracking-wider mb-1">Después</p>
                  <p className="text-accent text-sm font-medium">{row.after}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* After flow diagram */}
        <motion.div className="bg-white p-6 md:p-8" {...fade}>
          <p className="text-navy/40 text-xs uppercase tracking-wider mb-5">Flujo actual</p>
          <div className="flex flex-wrap items-center gap-2">
            {afterSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="bg-accent/10 text-accent text-sm font-medium px-3 py-1.5 whitespace-nowrap">
                  {step}
                </span>
                {i < afterSteps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-accent/40 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <SectionDivider />

        {/* ── 6. Resultados ── */}
        <motion.div {...fade}>
          <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-8">Resultados</h2>
          <div className="grid grid-cols-3 gap-6 text-center mb-8">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="text-accent font-bold text-3xl md:text-[56px] leading-none mb-2">{m.value}</p>
                <p className="text-navy/50 text-sm leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
          <p className="text-navy/60 leading-relaxed">
            Hoy, Sneaker Repair opera con un nivel de control que antes era impensable para un negocio de su tamaño. No necesitó un ERP genérico de miles de dólares. Necesitó una solución diseñada para su realidad.
          </p>
        </motion.div>

        <SectionDivider />

        {/* ── 7. Testimonial ── */}
        <motion.div className="grid grid-cols-12 gap-0 overflow-hidden" {...fade}>
          <div className="col-span-12 md:col-span-4">
            <ImagePlaceholder className="h-full min-h-[240px]">
              Foto de Iker Mendoza
            </ImagePlaceholder>
          </div>
          <div className="col-span-12 md:col-span-8 bg-accent text-white p-8 md:p-12 flex flex-col justify-center">
            <p className="text-white/90 text-lg md:text-xl italic mb-4 max-w-lg">
              "Ya no puedo seguir así — y no tuve que hacerlo."
            </p>
            <p className="text-white/50 text-sm font-medium">
              — Iker Mendoza, Fundador de Sneaker Repair
            </p>
          </div>
        </motion.div>

        <SectionDivider />

        {/* ── 8. CTA ── */}
        <motion.div className="text-center" {...fade}>
          <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-4">
            ¿Tu negocio también está creciendo más rápido que tus procesos?
          </h2>
          <p className="text-navy/60 leading-relaxed mb-8">
            Platiquemos. Sin compromiso.
          </p>
          <a
            href="https://wa.me/528447704939?text=Hola%2C%20vi%20el%20caso%20de%20Sneaker%20Repair%20y%20me%20interesa%20saber%20más"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white font-semibold text-base h-12 px-8 inline-flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Escribir por WhatsApp
          </a>
          <div className="mt-4">
            <Link to="/#contact" className="text-navy/50 text-sm hover:text-navy transition-colors">
              O agenda una llamada
            </Link>
          </div>
        </motion.div>
      </div>

      <HomeFooter />
    </div>
  );
}
