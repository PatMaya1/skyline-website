import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Mail, Shield, Palette, Languages, Users } from 'lucide-react';
import HomeHeader from '../components/home/HomeHeader';
import HomeFooter from '../components/home/HomeFooter';
import directSteelHero from '../assets/direct_steel_landing.png';

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function SectionDivider() {
  return <div className="w-16 h-px bg-navy/10 mx-auto my-16 md:my-24" />;
}

const snapshotInfo = [
  { label: 'Cliente', value: 'Direct Steel' },
  { label: 'Industria', value: 'Manufactura / Aluminio' },
  { label: 'Alcance', value: 'México e internacional' },
  { label: 'Entregables', value: 'Sitio web bilingüe, Google Workspace' },
];

const metrics = [
  { value: '2', label: 'Idiomas: español e inglés' },
  { value: '100%', label: 'Comunicación corporativa profesionalizada' },
  { value: '1', label: 'Plataforma digital completa' },
];

const phaseData = [
  { phase: '1', label: 'Descubrimiento', desc: 'Entender la operación, audiencia y objetivos de comunicación de Direct Steel' },
  { phase: '2', label: 'Diseño y contenido', desc: 'Arquitectura de información, diseño visual alineado a la industria y redacción bilingüe' },
  { phase: '3', label: 'Desarrollo', desc: 'Sitio web responsivo, optimizado para velocidad y SEO en ambos idiomas' },
  { phase: '4', label: 'Infraestructura', desc: 'Google Workspace configurado con dominio propio, correos y herramientas de colaboración' },
];

const features = [
  { icon: Languages, title: 'Sitio completamente bilingüe', desc: 'Navegación fluida entre español e inglés. Cada página, sección y detalle traducido y adaptado para ambos mercados.' },
  { icon: Palette, title: 'Diseño industrial profesional', desc: 'Identidad visual que refleja la solidez y escala de una empresa de manufactura de aluminio con operación internacional.' },
  { icon: Globe, title: 'Optimizado para SEO internacional', desc: 'Estructura técnica preparada para posicionar en búsquedas tanto en México como en mercados de habla inglesa.' },
  { icon: Mail, title: 'Google Workspace corporativo', desc: 'Correo electrónico con dominio propio, Google Drive compartido, Calendar y Meet para comunicación profesional interna y externa.' },
  { icon: Shield, title: 'Seguridad y administración', desc: 'Panel de administración de usuarios, políticas de seguridad y control de acceso centralizado para todo el equipo.' },
  { icon: Users, title: 'Listo para escalar', desc: 'Infraestructura preparada para agregar usuarios, buzones y herramientas conforme el equipo crezca.' },
];

const compareData = [
  { dim: 'Presencia web', before: 'Sin sitio web o presencia básica', after: 'Sitio corporativo profesional bilingüe' },
  { dim: 'Correo electrónico', before: 'Correos genéricos (Gmail, Hotmail)', after: 'Correo con dominio @directsteel.mx' },
  { dim: 'Imagen ante clientes', before: 'Percepción informal', after: 'Imagen corporativa a nivel de la operación' },
  { dim: 'Colaboración interna', before: 'Herramientas dispersas', after: 'Google Workspace unificado' },
  { dim: 'Alcance internacional', before: 'Comunicación solo en español', after: 'Presencia bilingüe español/inglés' },
];

export default function DirectSteelCase() {
  return (
    <div className="bg-page min-h-screen">
      <HomeHeader />

      {/* ── 1. Hero ── */}
      <div className="w-full bg-navy py-20 md:py-28">
        <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
          <motion.div {...fade}>
            <span className="bg-accent text-white text-sm font-medium px-3 py-1 inline-block mb-4">
              Manufactura | Aluminio
            </span>
            <h1 className="text-white font-semibold text-2xl md:text-[44px] leading-tight max-w-3xl">
              La cara digital de una empresa industrial con alcance internacional
            </h1>
            <p className="text-white/70 text-lg md:text-xl mt-4 max-w-2xl">
              Direct Steel × Skyline IT Consulting
            </p>
          </motion.div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-navy/5">
            {snapshotInfo.map((item) => (
              <div key={item.label}>
                <p className="text-navy/40 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-navy font-medium text-sm leading-snug">{item.value}</p>
              </div>
            ))}
          </div>

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
        <Link
          to="/#casos"
          className="inline-flex items-center gap-2 text-navy/60 hover:text-navy transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a casos de éxito</span>
        </Link>

        {/* ── 3. El contexto ── */}
        <motion.div className="max-w-3xl" {...fade}>
          <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-6">El contexto</h2>
          <div className="flex flex-col gap-4 text-navy/60 leading-relaxed">
            <p>
              Direct Steel es una empresa dedicada a la producción y comercialización de lingotes de aluminio con aleaciones de alta calidad. Integrados a la cadena de suministro industrial, trabajan con clientes en México y en mercados internacionales.
            </p>
            <p>
              A pesar de tener una operación consolidada en el sector industrial, su presencia digital no reflejaba el nivel de su negocio. No contaban con un sitio web profesional y la comunicación corporativa se manejaba con correos genéricos, lo que afectaba la percepción ante clientes y socios comerciales.
            </p>
            <p>
              El reto no era complejo en lo técnico — pero era importante en lo estratégico: construir una imagen digital que estuviera a la altura de una empresa industrial seria, y dotar al equipo de herramientas de comunicación profesionales desde el primer día.
            </p>
          </div>
        </motion.div>

        <SectionDivider />

        {/* ── 4. La solución ── */}
        <motion.div className="text-center" {...fade}>
          <p className="text-navy/40 text-xs uppercase tracking-wider mb-4">Lo que hicimos</p>
          <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-4">
            Sitio web corporativo e infraestructura digital
          </h2>
          <p className="text-navy/60 leading-relaxed max-w-2xl mx-auto">
            El proyecto se dividió en dos líneas claras: el sitio web corporativo y la infraestructura de comunicación con Google Workspace.
          </p>
        </motion.div>

        {/* Feature cards — centered grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-navy/5 mt-12" {...fade}>
          {features.map((f) => (
            <div key={f.title} className="bg-page p-8 md:p-10 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <f.icon className="w-7 h-7 text-navy" strokeWidth={1.5} />
              </div>
              <h3 className="text-navy font-semibold text-lg">{f.title}</h3>
              <p className="text-navy/50 text-sm leading-relaxed max-w-xs">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Phase timeline */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10" {...fade}>
          {phaseData.map((s) => (
            <div key={s.phase} className="bg-white p-5 border-t-[3px] border-accent">
              <p className="text-accent font-bold text-sm mb-1">Fase {s.phase}</p>
              <p className="text-navy font-semibold text-sm mb-2">{s.label}</p>
              <p className="text-navy/50 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </motion.div>

        <SectionDivider />

        {/* ── Screenshot ── */}
        <motion.div {...fade}>
          <p className="text-navy/40 text-xs uppercase tracking-wider mb-5">El sitio web</p>
          <div className="overflow-hidden rounded-sm shadow-sm">
            <img
              src={directSteelHero}
              alt="Direct Steel — sitio web"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <SectionDivider />

        {/* ── 5. Antes vs. Después ── */}
        <motion.div {...fade}>
          <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-6">Antes vs. Después</h2>
        </motion.div>

        {/* Desktop table */}
        <motion.div className="bg-white shadow-sm overflow-hidden mb-8 hidden md:block" {...fade}>
          <div className="grid grid-cols-[1fr_1fr_1fr]">
            <div className="p-4 bg-navy/[0.02] border-b border-navy/5" />
            <div className="p-4 border-b border-navy/5">
              <p className="text-navy/40 text-xs uppercase tracking-wider font-medium">Antes</p>
            </div>
            <div className="p-4 border-b border-navy/5">
              <p className="text-accent text-xs uppercase tracking-wider font-medium">Después</p>
            </div>
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

        {/* Mobile cards */}
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

        <SectionDivider />

        {/* ── 6. Resultados ── */}
        <motion.div
          className="py-14 md:py-16 px-6 flex items-center justify-between"
          {...fade}
        >
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center text-center">
              <p className="text-navy font-bold text-4xl md:text-[60px] leading-none">{m.value}</p>
              <p className="text-navy/50 text-lg md:text-xl mt-2">{m.label}</p>
            </div>
          ))}
        </motion.div>
        <motion.p className="text-navy/60 leading-relaxed max-w-3xl mt-8" {...fade}>
          Direct Steel ahora cuenta con una presencia digital que refleja la seriedad de su operación industrial. El sitio web bilingüe les permite comunicarse con clientes y socios en ambos idiomas, y Google Workspace les da las herramientas para operar con la profesionalidad que su industria exige.
        </motion.p>

        <SectionDivider />

        {/* ── 7. CTA ── */}
        <motion.div className="text-center" {...fade}>
          <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-4">
            ¿Tu empresa necesita una presencia digital profesional?
          </h2>
          <p className="text-navy/60 leading-relaxed mb-8">
            Platiquemos. Sin compromiso.
          </p>
          <a
            href="https://wa.me/528447704939?text=Hola%2C%20vi%20el%20caso%20de%20Direct%20Steel%20y%20me%20interesa%20saber%20más"
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
