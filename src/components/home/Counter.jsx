import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import data from '../../data/homepage.json';

export default function Counter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="bg-white">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0 py-12 md:py-[52px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        {data.counter.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <span className="font-bold text-navy text-4xl md:text-[60px] leading-tight">
              {stat.value}
            </span>
            <span className="font-normal text-xl text-navy/50">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
