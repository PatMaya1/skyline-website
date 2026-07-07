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
          className="grid grid-cols-12 gap-6 mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="col-span-12 flex flex-col gap-5 items-center text-center">
            <p className="text-[#6a6e7a] text-base uppercase">
              {news.label}
            </p>
            <h2 className="text-navy font-semibold text-3xl md:text-[40px] leading-tight">
              {news.heading}
            </h2>
          </div>
        </motion.div>

        {/* News Cards */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {news.articles.map((article, i) => (
            <div key={article.title} className="col-span-12 md:col-span-6 xl:col-span-4">
              <NewsCard article={article} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
