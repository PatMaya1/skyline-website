import { motion } from 'framer-motion';
import partner1 from '../../assets/figma/logos/partner-1.svg';
import partner2 from '../../assets/figma/logos/partner-2.svg';
import partner3 from '../../assets/figma/logos/partner-3.svg';
import partner4 from '../../assets/figma/logos/partner-4.svg';
import partner5 from '../../assets/figma/logos/partner-5.svg';

const logos = [partner1, partner2, partner3, partner4, partner5];

export default function LogoBar() {
  return (
    <section className="bg-white">
      <motion.div
        className="max-w-[1076px] mx-auto px-4 xl:px-0 py-12 md:py-[60px] flex items-center justify-between gap-6 overflow-x-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`Partner ${i + 1}`}
            className="h-12 md:h-[76px] w-auto opacity-60 hover:opacity-100 transition-opacity shrink-0"
          />
        ))}
      </motion.div>
    </section>
  );
}
