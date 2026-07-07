import { motion } from 'framer-motion';
import { Headset, Activity, ShieldCheck, Network, DatabaseBackup, CloudCog, MapPin } from 'lucide-react';
import data from '../../data/homepage.json';

const iconMap = { Headset, Activity, ShieldCheck, Network, DatabaseBackup, CloudCog };

export default function ManagedServices() {
  const { managedServices } = data;

  return (
    <section id="managed-services" className="py-16 md:py-[120px]">
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
            {managedServices.label}
          </p>
          <h2 className="col-span-12 lg:col-span-7 text-navy font-semibold text-3xl md:text-[40px] leading-tight">
            {managedServices.heading}
          </h2>
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-3 lg:items-end">
            <p className="text-navy/60 text-base leading-relaxed">
              {managedServices.description}
            </p>
            <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              {managedServices.badge}
            </span>
          </div>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managedServices.cards.map((card, i) => {
            const Icon = iconMap[card.icon];

            return (
              <motion.div
                key={card.title}
                className="bg-navy p-8 flex flex-col gap-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-accent shrink-0" strokeWidth={1.5} />
                  <h3 className="font-semibold text-lg text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  {card.description}
                </p>
                <span className="inline-block bg-accent/20 text-accent text-sm font-medium px-3 py-1 w-fit">
                  {card.highlight}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href={managedServices.cta.href}
            className="inline-block bg-accent text-white font-semibold text-base px-8 py-4 hover:bg-accent-dark transition-colors"
          >
            {managedServices.cta.text}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
