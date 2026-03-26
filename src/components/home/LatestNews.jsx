import { motion } from 'framer-motion';
import NewsCard from './NewsCard';
import data from '../../data/homepage.json';

export default function LatestNews() {
  const { news } = data;

  return (
    <section className="py-8 md:py-[60px]">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-5 items-center text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#6a6e7a] text-base uppercase">
            {news.label}
          </p>
          <h2 className="text-navy font-semibold text-3xl md:text-[40px] leading-tight">
            {news.heading}
          </h2>
        </motion.div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
          {news.articles.map((article, i) => (
            <NewsCard key={article.title} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
