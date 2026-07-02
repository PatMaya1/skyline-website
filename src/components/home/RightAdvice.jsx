import { motion } from 'framer-motion';
import adviceIcon from '../../assets/figma/icons/advice-icon.svg';
import adviceBg from '../../assets/figma/sectors/advice-bg.webp';
import data from '../../data/homepage.json';

export default function RightAdvice() {
  const { rightAdvice } = data;

  return (
    <section id="about" className="bg-navy">
      <div className="grid grid-cols-12">
        {/* Left: Full-bleed image */}
        <div className="col-span-12 lg:col-span-6 h-[300px] lg:h-auto relative min-h-[400px]">
          <img
            src={adviceBg}
            alt="Strategic consulting partner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right: Text content */}
        <div className="col-span-12 lg:col-span-6 flex items-center justify-center px-6 md:px-16 py-20 lg:py-24">
          <motion.div
            className="flex flex-col gap-10 max-w-[531px]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-5">
              <p className="text-white/80 text-base uppercase">
                {rightAdvice.label}
              </p>
              <h2 className="text-light font-semibold text-3xl md:text-[40px] leading-tight">
                {rightAdvice.heading}
              </h2>
            </div>

            <div className="flex flex-col gap-10">
              {rightAdvice.features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="flex gap-6 md:gap-10 items-start"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                >
                  <img src={adviceIcon} alt="" className="w-7 h-7 shrink-0 mt-1" />
                  <div className="flex flex-col gap-5">
                    <h3 className="text-light font-semibold text-xl md:text-2xl">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-base leading-relaxed max-w-[396px]">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
