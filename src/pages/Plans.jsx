import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Rocket, Zap, LayoutGrid, ShoppingCart, TrendingUp,
  Check, ChevronDown, ChevronUp, Clock, ArrowRight, ExternalLink
} from 'lucide-react';
import HomeHeader from '../components/home/HomeHeader';
import HomeFooter from '../components/home/HomeFooter';
import websitePlans from '../data/websitePlans.json';
import ecommercePlans from '../data/ecommercePlans.json';
import maintenance from '../data/maintenance.json';

const iconMap = { Globe, Rocket, Zap, LayoutGrid, ShoppingCart, TrendingUp };

function PlanCard({ plan, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[plan.icon] || Globe;
  const visibleFeatures = expanded ? plan.features : plan.features.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative flex flex-col bg-white border ${
        plan.popular
          ? 'border-accent shadow-lg'
          : 'border-navy/5 shadow-sm'
      } hover:border-accent/40 transition-colors duration-300`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-accent py-1 px-3 text-white text-xs font-semibold uppercase tracking-wide">
          Popular
        </div>
      )}

      <div className="flex-1 flex flex-col p-8">
        {/* Icon + Plan name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-navy font-semibold text-lg">{plan.name}</h3>
            <p className="text-navy/40 text-sm">{plan.subtitle}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-1">
          <span className="text-navy font-bold text-4xl">{plan.price.replace(' MXN', '')}</span>
          <span className="text-navy/40 text-base ml-2">MXN</span>
        </div>
        <p className="text-navy/40 text-sm">{plan.priceNote}</p>
        <div className="flex items-center gap-1.5 text-navy/30 text-xs mt-2">
          <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
          Entrega: {plan.delivery}
        </div>

        {/* Includes previous */}
        {plan.includesPrevious && (
          <div className="mt-4 bg-accent/5 border border-accent/10 px-3 py-2 text-sm text-accent font-medium">
            Incluye todo del {plan.includesPrevious}
          </div>
        )}

        {/* Description */}
        <p className="mt-4 text-navy/60 text-sm leading-relaxed">{plan.description}</p>

        {/* Features */}
        <ul className="mt-5 flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {visibleFeatures.map((feature) => (
              <motion.li
                key={feature.title}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3"
              >
                <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" strokeWidth={2.5} />
                <div>
                  <span className="text-navy text-sm font-medium">{feature.title}</span>
                  <p className="text-navy/40 text-xs">{feature.description}</p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {plan.features.length > 4 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            {expanded ? 'Ver menos' : `Ver ${plan.features.length - 4} mas`}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}

        <div className="border-t border-navy/5 my-5" />

        {/* Benefit */}
        <p className="text-navy/40 text-xs leading-5 mb-5">{plan.benefit}</p>

        {/* CTA */}
        <div className="mt-auto flex flex-col gap-3">
          <Link
            to="/#contact"
            className={`w-full h-12 flex items-center justify-center gap-2 font-semibold text-base transition-colors group ${
              plan.popular
                ? 'bg-accent text-white hover:bg-accent/90'
                : 'border border-navy/10 text-navy hover:border-accent hover:text-accent'
            }`}
          >
            Solicitar {plan.name}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
          {plan.example && (
            <a
              href={plan.example}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 flex items-center justify-center gap-2 border border-accent/10 bg-accent/5 text-accent text-sm font-medium hover:bg-accent/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Ver ejemplo en vivo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Plans() {
  const [isEcommerce, setIsEcommerce] = useState(false);
  const activePlans = isEcommerce ? ecommercePlans : websitePlans;

  return (
    <div className="bg-page min-h-screen">
      <HomeHeader />

      {/* Hero */}
      <section className="bg-navy pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
          <motion.div
            className="flex flex-col gap-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/80 text-base uppercase">Planes</p>
            <h1 className="text-light font-semibold text-3xl md:text-[48px] leading-tight">
              Encuentra el plan perfecto
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-2xl mx-auto">
              Soluciones disenadas para cada etapa de tu negocio. Todos los planes incluyen dominio y hosting en la nube durante el primer ano.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            className="flex justify-center items-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => setIsEcommerce(false)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
                !isEcommerce
                  ? 'bg-accent text-white'
                  : 'bg-white/10 text-white/50 hover:text-white/80'
              }`}
            >
              <Globe className="w-4 h-4" strokeWidth={1.5} />
              Paginas Web
            </button>
            <button
              onClick={() => setIsEcommerce(true)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
                isEcommerce
                  ? 'bg-accent text-white'
                  : 'bg-white/10 text-white/50 hover:text-white/80'
              }`}
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
              Catalogos / Tienda
            </button>
          </motion.div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16 md:py-[100px]">
        <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={isEcommerce ? 'ecommerce' : 'websites'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`grid gap-6 ${
                activePlans.length === 3
                  ? 'grid-cols-1 md:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2 max-w-[700px] mx-auto'
              }`}
            >
              {activePlans.map((plan, index) => (
                <PlanCard key={plan.id} plan={plan} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Note */}
          <motion.div
            className="mt-12 border border-accent/10 bg-accent/5 px-6 py-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-navy/60 text-sm">
              Todos los planes incluyen <span className="font-semibold text-navy">dominio* y hosting en la nube</span> durante el primer ano.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Maintenance Section */}
      <section className="bg-navy">
        <div className="grid grid-cols-12">
          {/* Left: Info */}
          <div className="col-span-12 lg:col-span-6 flex items-center justify-center px-6 md:px-16 py-20 lg:py-24">
            <motion.div
              className="flex flex-col gap-8 max-w-[531px]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-5">
                <p className="text-white/80 text-base uppercase">Servicio mensual</p>
                <h2 className="text-light font-semibold text-3xl md:text-[40px] leading-tight">
                  {maintenance.title}
                </h2>
                <p className="text-white/60 text-base leading-relaxed">
                  {maintenance.service.description}
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="text-light font-bold text-5xl">{maintenance.service.price.replace(' MXN', '')}</span>
                <span className="text-white/40 text-base pb-1">MXN / {maintenance.service.priceNote}</span>
              </div>

              <Link
                to="/#contact"
                className="bg-accent text-white font-semibold text-base h-12 flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors w-full lg:w-auto lg:px-8 group"
              >
                Contratar Mantenimiento
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>

          {/* Right: Features */}
          <div className="col-span-12 lg:col-span-6 bg-white/5 flex items-center justify-center px-6 md:px-16 py-20 lg:py-24">
            <motion.div
              className="flex flex-col gap-6 max-w-[531px] w-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                Que incluye
              </p>
              <ul className="flex flex-col gap-5">
                {maintenance.service.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="w-7 h-7 bg-accent/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-accent" strokeWidth={2.5} />
                    </div>
                    <span className="text-white/80 text-base">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-page py-10">
        <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
          <p className="text-center text-navy/30 text-xs">
            *Cubrimos hasta $500 MXN del costo del dominio, cualquier diferencia sera cubierta por el cliente.
          </p>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
