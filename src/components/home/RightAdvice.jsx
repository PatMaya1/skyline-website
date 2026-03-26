import { motion } from 'framer-motion';
import adviceIcon from '../../assets/figma/icons/advice-icon.svg';
import adviceBg from '../../assets/figma/sectors/advice-bg.png';
import data from '../../data/homepage.json';

export default function RightAdvice() {
  const { rightAdvice } = data;

  return (
    <section className="relative w-full overflow-hidden lg:h-[680px]">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left: Navy content */}
        <div className="bg-navy lg:w-1/2 flex items-center justify-center px-4 md:px-10 py-16 lg:py-0">
          <motion.div
            className="flex flex-col gap-10 items-center max-w-[531px]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-5 items-start w-full">
              <p className="text-white/80 text-base uppercase">
                {rightAdvice.label}
              </p>
              <h2 className="text-light font-semibold text-3xl md:text-[40px] leading-tight">
                {rightAdvice.heading}
              </h2>
            </div>

            <div className="flex flex-col gap-10 w-full">
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

        {/* Right: Background image */}
        <div className="lg:w-1/2 h-[300px] lg:h-full relative">
          <img
            src={adviceBg}
            alt="Financial advice"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
