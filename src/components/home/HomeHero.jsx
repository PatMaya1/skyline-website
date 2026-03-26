import { motion } from 'framer-motion';
import HomeHeader from './HomeHeader';
import logoBg from '../../assets/logos_skyline/logoblanco.png';
import checkIcon from '../../assets/figma/icons/check-icon.svg';
import data from '../../data/homepage.json';

export default function HomeHero() {
  const { hero } = data;

  return (
    <section className="bg-navy relative overflow-hidden min-h-[500px] lg:h-[680px]">
      <HomeHeader />

      {/* Logo background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={logoBg} alt="" className="w-[500px] lg:w-[680px] opacity-5" />
      </div>

      {/* Content */}
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0 pt-28 md:pt-36 lg:pt-[140px] pb-12 lg:pb-0">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Text Content */}
          <motion.div
            className="col-span-12 lg:col-span-7 flex flex-col gap-[60px] z-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-5">
              <p className="text-white/80 text-base uppercase tracking-wide">
                {hero.label}
              </p>
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
            <div className="flex gap-5">
              <button className="bg-accent text-white font-semibold text-lg md:text-xl h-[50px] w-[192px] flex items-center justify-center hover:bg-accent/90 transition-colors">
                {hero.cta.primary}
              </button>
              <button className="border-2 border-accent text-accent font-semibold text-lg md:text-xl h-[50px] w-[192px] flex items-center justify-center hover:bg-accent/10 transition-colors">
                {hero.cta.secondary}
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
