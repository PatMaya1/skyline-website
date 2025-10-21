import { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * Componente memorizado para tecnologías individuales
 * Evita re-renders innecesarios cuando cambia selectedCategory
 */
const TechCard = memo(({ tech, index, animationConfig }) => {
  return (
    <motion.div
      {...animationConfig}
      className="group relative h-48"
    >
      {/* Card hover effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-blue-800 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      
      <div className="relative bg-white rounded-2xl p-6 border border-gray-200 group-hover:border-transparent transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
        {/* Logo and Title Row */}
        <div className="flex items-center mb-4 flex-shrink-0">
          <div className="relative mr-4 flex-shrink-0">
            <div className="absolute inset-0 bg-transparent rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative w-18 h-18 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img 
                src={tech.logo} 
                alt={tech.name} 
                className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg items-center justify-center text-white text-lg font-bold">
                {tech.name.charAt(0)}
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 leading-tight">
            {tech.name}
          </h3>
        </div>

        {/* Description */}
        <div className="flex-1 flex items-start">
          <p className="text-gray-600 text-m leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {tech.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

TechCard.displayName = 'TechCard';

/**
 * Componente memorizado para estadísticas
 */
const StatCard = memo(({ stat, index, getColorClass, animationDelayMultiplier }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: animationDelayMultiplier * (index + 1) }}
      className="text-center bg-transparent"
    >
      <div className={`text-3xl font-bold ${getColorClass(stat.color)} mb-2`}>{stat.value}</div>
      <div className="text-gray-600 text-sm">{stat.label}</div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

export { TechCard, StatCard };
