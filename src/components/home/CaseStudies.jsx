import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import caseStudies from '../../data/caseStudies.json';
import readMoreArrow from '../../assets/figma/icons/read-more-arrow.svg';
import sneakerRepairImg from '../../assets/sneaker_repair_landing.webp';
import directSteelImg from '../../assets/direct_steel_landing.webp';
import breoImg from '../../assets/projects/breo.webp';
import tornillosImg from '../../assets/projects/tornillos-del-sur.webp';
import enefImg from '../../assets/projects/enef.webp';

const imageMap = {
  'sneaker-repair': sneakerRepairImg,
  'direct-steel': directSteelImg,
  'breo': breoImg,
  'tornillos-del-sur': tornillosImg,
  'enef': enefImg,
};

export default function CaseStudies() {
  return (
    <section id="casos" className="py-16 md:py-[120px]">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-5 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-navy/60 text-base uppercase">
            Casos de éxito
          </p>
          <h2 className="text-navy font-semibold text-3xl md:text-[40px] leading-tight">
            Así ayudamos a nuestros clientes
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {caseStudies.map((study, i) => (
            <motion.article
              key={study.id}
              className="col-span-12 md:col-span-6 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="h-[240px] md:h-[320px] w-full relative overflow-hidden">
                <img
                  src={imageMap[study.image]}
                  alt={study.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="bg-white flex flex-col gap-4 p-6">
                <h3 className="text-navy font-semibold text-lg md:text-xl leading-snug">
                  {study.title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed">
                  {study.description}
                </p>
                <Link
                  to={`/casos/${study.id}`}
                  className="flex items-center gap-2 text-navy/60 text-base hover:text-navy transition-colors group mt-1"
                >
                  <span>Leer más</span>
                  <img src={readMoreArrow} alt="" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
