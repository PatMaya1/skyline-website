import { motion } from 'framer-motion';
import personImg from '../../assets/figma/testimonials/person.png';
import quotesIcon from '../../assets/figma/icons/quotes.svg';
import data from '../../data/homepage.json';

export default function Testimonials() {
  const { testimonials } = data;

  return (
    <section className="pt-16 md:pt-[120px] pb-8 md:pb-[60px]">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        <motion.div
          className="bg-white flex flex-col md:flex-row gap-8 md:gap-[60px] items-center overflow-hidden p-6 md:p-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Image */}
          <div className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px] shrink-0">
            <div className="absolute inset-0 bg-accent" />
            <img
              src={personImg}
              alt={testimonials.author}
              className="absolute inset-0 w-[95%] h-full object-cover mx-auto"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 w-full md:w-[482px] relative">
            <h2 className="text-navy font-semibold text-3xl md:text-[40px] leading-tight">
              {testimonials.heading}
            </h2>
            <p className="text-navy/60 text-base leading-relaxed">
              {testimonials.quote}
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-black font-semibold text-base">
                {testimonials.author}
              </p>
              <p className="text-black/50 text-xs">
                {testimonials.role}
              </p>
            </div>
            {/* Quote marks */}
            <img
              src={quotesIcon}
              alt=""
              className="absolute bottom-0 right-0 w-[66px] h-[57px] hidden md:block"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
