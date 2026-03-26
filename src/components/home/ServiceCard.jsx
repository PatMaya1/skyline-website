import { motion } from 'framer-motion';
import { Cog, BarChart3, Zap, ShieldCheck, Users, Smartphone, ArrowRight } from 'lucide-react';

const iconMap = [Cog, BarChart3, Zap, ShieldCheck, Users, Smartphone];

export default function ServiceCard({ card, index }) {
  const Icon = iconMap[index] || Cog;

  return (
    <motion.div
      className="group flex flex-col px-8 md:px-12 py-12 h-[420px] w-full shadow-sm bg-white hover:bg-navy transition-colors duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="w-[60px] h-[60px] flex items-center justify-center shrink-0">
        <Icon className="w-10 h-10 text-accent group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <h3 className="font-semibold text-2xl text-navy group-hover:text-white transition-colors duration-300">
          {card.title}
        </h3>
        <p className="text-base text-navy/60 group-hover:text-white/80 transition-colors duration-300">
          {card.description}
        </p>
      </div>

      <button className="bg-accent flex gap-2.5 items-center justify-center h-10 w-[160px] hover:bg-accent/90 transition-colors mt-auto shrink-0">
        <span className="font-semibold text-xl text-light">Detalles</span>
        <ArrowRight className="w-5 h-5 text-light" />
      </button>
    </motion.div>
  );
}
