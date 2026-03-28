import { motion } from 'framer-motion';
import HomeHeader from './HomeHeader';
import logoBg from '../../assets/logos_skyline/logoblanco.png';
import checkIcon from '../../assets/figma/icons/check-icon.svg';
import data from '../../data/homepage.json';

export default function HomeHero() {
  const { hero } = data;

  return (
    <section className="bg-navy relative overflow-hidden">
      <HomeHeader />

      {/* Logo background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={logoBg} alt="" className="w-[500px] lg:w-[680px] opacity-5" />
      </div>

      {/* Content */}
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0 pt-28 md:pt-36 lg:pt-[140px] pb-12 md:pb-16 lg:pb-20">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Text Content */}
          <motion.div
            className="col-span-12 lg:col-span-7 flex flex-col gap-[60px] z-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-5">
              <h1 className="text-white font-semibold text-3xl md:text-[40px] leading-tight">
                {hero.heading}
              </h1>
              <p className="text-white/80 text-base leading-relaxed">
                {hero.description}
              </p>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-5">
                {hero.features.slice(0, 2).map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-11 h-11 flex items-center justify-center p-2">
                      <img src={checkIcon} alt="" className="w-7 h-7" />
                    </div>
                    <span className="text-white font-semibold text-base">{feature}</span>
                  </div>
                ))}
              </div>
              {hero.features[2] && (
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 flex items-center justify-center p-2">
                    <img src={checkIcon} alt="" className="w-7 h-7" />
                  </div>
                  <span className="text-white font-semibold text-base">{hero.features[2]}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-5">
              <a href="#contact" className="bg-accent text-white font-semibold text-base md:text-xl h-[50px] md:h-[56px] px-8 md:px-10 flex items-center justify-center hover:bg-accent/90 transition-colors whitespace-nowrap">
                {hero.cta.primary}
              </a>
              <a href="#casos" className="border-2 border-accent text-accent font-semibold text-base md:text-xl h-[50px] md:h-[56px] px-8 md:px-10 flex items-center justify-center hover:bg-accent/10 transition-colors whitespace-nowrap">
                {hero.cta.secondary}
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
