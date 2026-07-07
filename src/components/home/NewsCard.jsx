import { motion } from 'framer-motion';
import readMoreArrow from '../../assets/figma/icons/read-more-arrow.svg';

const newsImages = import.meta.glob('../../assets/figma/news/*.png', { eager: true });

function getNewsImage(filename) {
  const key = Object.keys(newsImages).find(k => k.endsWith(filename));
  return key ? newsImages[key].default : '';
}

export default function NewsCard({ article, index }) {
  return (
    <motion.article
      className="flex flex-col w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="h-[240px] md:h-[320px] w-full relative overflow-hidden">
        <img
          src={getNewsImage(article.image)}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="bg-white flex flex-col gap-5 p-4">
        <p className="text-navy/60 text-sm">
          {article.date} / {article.category}
        </p>
        <h3 className="text-navy font-semibold text-lg md:text-xl leading-snug">
          {article.title}
        </h3>
        <a href="#" className="flex items-center gap-2 text-navy/60 text-base hover:text-navy transition-colors group">
          <span>Leer más</span>
          <img src={readMoreArrow} alt="" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.article>
  );
}
