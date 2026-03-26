import { motion } from 'framer-motion';
import caseStudies from '../../data/caseStudies.json';

export default function CaseStudies() {
  return (
    <section id="casos" className="py-16 md:py-[120px]">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-5 mb-10 md:mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-navy/60 text-base uppercase">
            Casos de éxito
          </p>
          <h2 className="text-navy font-semibold text-3xl md:text-[40px] leading-tight">
            Resultados que hablan por sí mismos
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              className="col-span-12 md:col-span-4 bg-white shadow-sm flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Industry badge + duration */}
              <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                <span className="bg-accent/10 text-accent text-sm font-medium px-3 py-1">
                  {study.industry}
                </span>
                <span className="text-navy/40 text-sm">
                  {study.duration}
                </span>
              </div>

              {/* Client + Challenge */}
              <div className="px-8 pb-6 flex flex-col gap-3">
                <h3 className="text-navy font-semibold text-lg">
                  {study.client}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              {/* Results metrics */}
              <div className="px-8 py-6 bg-navy/[0.03] grid grid-cols-3 gap-2">
                {study.results.map((result, j) => (
                  <div key={j} className="flex flex-col gap-1 text-center">
                    <span className="text-accent font-bold text-xl md:text-2xl">
                      {result.metric}
                    </span>
                    <span className="text-navy/50 text-xs leading-tight">
                      {result.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="px-8 py-6 mt-auto border-t border-navy/5">
                <p className="text-navy/50 text-sm italic mb-2">
                  "{study.quote}"
                </p>
                <p className="text-navy/40 text-xs font-medium">
                  — {study.quoteAuthor}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
