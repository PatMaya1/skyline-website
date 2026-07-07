import { motion } from 'framer-motion';
import quotesIcon from '../../assets/figma/icons/quotes.svg';
import data from '../../data/homepage.json';

export default function Testimonials() {
  const { testimonials } = data;

  return (
    <section className="pt-16 md:pt-[120px] pb-8 md:pb-[60px]">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        <motion.h2
          className="text-navy font-semibold text-3xl md:text-[40px] leading-tight text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {testimonials.heading}
        </motion.h2>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {testimonials.items.map((item, i) => (
            <motion.div
              key={item.author}
              className="col-span-12 md:col-span-4 bg-white p-8 flex flex-col gap-6 relative shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Quote icon */}
              <img
                src={quotesIcon}
                alt=""
                className="w-10 h-9 opacity-20"
              />

              <p className="text-navy/60 text-base leading-relaxed flex-1">
                {item.quote}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-navy/10">
                {/* Initials avatar */}
                <div className="w-12 h-12 bg-accent flex items-center justify-center shrink-0">
                  <span className="text-white font-semibold text-lg">
                    {item.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-navy font-semibold text-base">
                    {item.author}
                  </p>
                  <p className="text-navy/50 text-sm">
                    {item.role} / {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
