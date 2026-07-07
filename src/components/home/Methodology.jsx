import { motion } from 'framer-motion';
import { Search, FileText, Rocket, BarChart3 } from 'lucide-react';
import data from '../../data/homepage.json';

const iconMap = [Search, FileText, Rocket, BarChart3];

export default function Methodology() {
  const { methodology } = data;

  return (
    <section id="methodology" className="bg-page py-16 md:py-[120px]">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-5 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-navy/60 text-base uppercase">
            {methodology.label}
          </p>
          <h2 className="text-navy font-semibold text-3xl md:text-[40px] leading-tight max-w-[600px]">
            {methodology.heading}
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {methodology.steps.map((step, i) => {
            const Icon = iconMap[i];
            return (
              <motion.div
                key={step.number}
                className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col gap-6 p-8 bg-white border border-navy/5 relative group hover:border-accent/40 transition-colors duration-300 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* Step number */}
                <div className="flex items-center justify-between">
                  <span className="text-accent font-semibold text-4xl">
                    {step.number}
                  </span>
                  <Icon className="w-8 h-8 text-navy/20 group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
                </div>

                {/* Title + Subtitle */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-navy font-semibold text-xl">
                    {step.title}
                  </h3>
                  <span className="text-accent text-sm font-medium">
                    {step.subtitle}
                  </span>
                </div>

                {/* Description */}
                <p className="text-navy/60 text-base leading-relaxed">
                  {step.description}
                </p>

                {/* Deliverable */}
                <div className="mt-auto pt-4 border-t border-navy/10">
                  <p className="text-navy/40 text-sm">
                    <span className="text-navy/60 font-medium">Entregable:</span>{' '}
                    {step.deliverable}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
