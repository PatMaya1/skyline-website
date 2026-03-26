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
          className="flex flex-col gap-5 mb-10 md:mb-[43px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-navy/60 text-base uppercase">
            {services.label}
          </p>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <h2 className="text-navy font-semibold text-3xl md:text-[40px] leading-tight max-w-[531px]">
              {services.heading}
            </h2>
            <div className="flex flex-col gap-3 items-end max-w-[448px]">
              <p className="text-navy/60 text-base leading-relaxed">
                {services.description}
              </p>
              <a href="#" className="text-navy font-semibold text-base underline underline-offset-2 hover:text-accent transition-colors">
                All services
              </a>
            </div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
          {services.cards.map((card, i) => (
            <ServiceCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
