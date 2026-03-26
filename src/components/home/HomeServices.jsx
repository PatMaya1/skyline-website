import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import data from '../../data/homepage.json';

export default function HomeServices() {
  const { services } = data;

  return (
    <section id="services" className="py-16 md:py-[120px]">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <motion.div
          className="grid grid-cols-12 gap-6 mb-10 md:mb-[43px]"
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
            <a href="#" className="text-navy font-semibold text-base underline underline-offset-2 hover:text-accent transition-colors">
              Todos los servicios
            </a>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {services.cards.map((card, i) => (
            <div key={card.title} className="col-span-12 md:col-span-6 xl:col-span-4">
              <ServiceCard card={card} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
