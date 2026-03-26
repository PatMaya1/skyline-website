import { motion } from 'framer-motion';
import sectorsIcon from '../../assets/figma/icons/sectors-icon.svg';
import data from '../../data/homepage.json';

// Import all sector images
const sectorImages = import.meta.glob('../../assets/figma/sectors/*.png', { eager: true });

function getSectorImage(filename) {
  const key = Object.keys(sectorImages).find(k => k.endsWith(filename));
  return key ? sectorImages[key].default : '';
}

export default function Sectors() {
  const { sectors } = data;

  return (
    <section className="py-16 md:py-[120px]">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-5 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-navy/60 text-base uppercase">
            {sectors.label}
          </p>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <h2 className="text-navy font-semibold text-3xl md:text-[40px] leading-tight max-w-[531px]">
              {sectors.heading}
            </h2>
            <div className="flex items-start gap-5 max-w-[526px]">
              <img src={sectorsIcon} alt="" className="w-[60px] h-[60px] shrink-0" />
              <p className="text-navy/60 text-base leading-relaxed">
                {sectors.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {sectors.items.map((item, i) => (
            <motion.div
              key={item.title}
              className="relative size-full aspect-square overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <img
                src={getSectorImage(item.image)}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-6">
                <h3 className="text-white font-semibold text-lg md:text-2xl">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
