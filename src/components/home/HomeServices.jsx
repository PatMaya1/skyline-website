import { motion } from 'framer-motion';
import { Compass, BarChart3, Settings2, Brain, Cloud, Shield } from 'lucide-react';
import data from '../../data/homepage.json';

const iconMap = [Compass, BarChart3, Settings2, Brain, Cloud, Shield];

export default function HomeServices() {
  const { services } = data;

  return (
    <section id="services" className="py-16 md:py-[120px]">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <motion.div
          className="grid grid-cols-12 gap-6 mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="col-span-12 text-navy/60 text-base uppercase">
            {services.label}
          </p>
          <h2 className="col-span-12 lg:col-span-7 text-navy font-semibold text-3xl md:text-[40px] leading-tight">
            {services.heading}
          </h2>
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-3 lg:items-end">
            <p className="text-navy/60 text-base leading-relaxed">
              {services.description}
            </p>
            <a href="#contact" className="text-navy font-semibold text-base underline underline-offset-2 hover:text-accent transition-colors">
              Solicitar diagnóstico
            </a>
          </div>
        </motion.div>

        {/* Alternating Service Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.cards.map((card, i) => {
            const Icon = iconMap[i];

            return (
              <motion.div
                key={card.title}
                className="bg-white p-8 md:p-10 flex flex-col justify-center gap-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-accent shrink-0" strokeWidth={1.5} />
                  <h3 className="font-semibold text-xl md:text-2xl text-navy">
                    {card.title}
                  </h3>
                </div>
                <p className="text-base text-navy/60 leading-relaxed">
                  {card.description}
                </p>
                <a
                  href="#contact"
                  className="text-accent font-semibold text-base hover:text-accent/80 transition-colors inline-flex items-center gap-2 w-fit"
                >
                  Solicitar información
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
