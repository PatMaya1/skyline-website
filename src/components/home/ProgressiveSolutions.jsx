import { motion } from 'framer-motion';
import businessWoman from '../../assets/figma/hero/business-woman.png';
import data from '../../data/homepage.json';

export default function ProgressiveSolutions() {
  const { progressive } = data;

  return (
    <section className="bg-navy overflow-hidden">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0 py-16 md:py-[120px] flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text */}
        <motion.div
          className="flex flex-col gap-6 w-full lg:max-w-[526px]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-5">
            <p className="text-white/80 text-base uppercase">
              {progressive.label}
            </p>
            <h2 className="text-light font-semibold text-3xl md:text-[40px] leading-tight">
              {progressive.heading}
            </h2>
          </div>
          <p className="text-white/80 text-base leading-relaxed">
            {progressive.description}
          </p>
          <button className="bg-accent text-white font-semibold text-xl h-[50px] w-[192px] flex items-center justify-center hover:bg-accent/90 transition-colors">
            {progressive.cta}
          </button>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative w-[300px] h-[300px] md:w-[416px] md:h-[416px] shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-accent" />
          <img
            src={businessWoman}
            alt="Business professional"
            className="absolute inset-0 w-[90%] h-full object-cover mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
