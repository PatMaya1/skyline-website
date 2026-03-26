import { motion } from 'framer-motion';
import arrowRight from '../../assets/figma/icons/arrow-right.svg';

// Import all service icons
import serviceIcon1 from '../../assets/figma/icons/service-icon-1.svg';
import serviceIcon2 from '../../assets/figma/icons/service-icon-2.svg';
import serviceIcon5 from '../../assets/figma/icons/service-icon-5.svg';
import serviceIcon6 from '../../assets/figma/icons/service-icon-6.svg';

const iconMap = [serviceIcon1, serviceIcon2, serviceIcon5, serviceIcon6, serviceIcon5, serviceIcon6];

export default function ServiceCard({ card, index }) {
  const icon = iconMap[index] || serviceIcon1;

  return (
    <motion.div
      className="group flex flex-col items-start justify-center px-8 md:px-12 py-10 h-[380px] w-full shadow-sm bg-white hover:bg-navy transition-colors duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex flex-col gap-10 items-start justify-end">
        <div className="w-[60px] h-[60px] overflow-hidden">
          <img src={icon} alt="" className={`w-full h-full transition-all duration-300 ${
            index === 0
              ? 'invert group-hover:invert-0'
              : 'group-hover:brightness-0 group-hover:invert'
          }`} />
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="font-semibold text-2xl text-navy group-hover:text-white transition-colors duration-300">
            {card.title}
          </h3>
          <p className="text-base text-navy/60 group-hover:text-white/80 transition-colors duration-300 w-[240px]">
            {card.description}
          </p>
        </div>

        <button className="bg-accent flex gap-2.5 items-center justify-center h-10 w-[160px] hover:bg-accent/90 transition-colors">
          <span className="font-semibold text-xl text-light">Details</span>
          <img src={arrowRight} alt="" className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
