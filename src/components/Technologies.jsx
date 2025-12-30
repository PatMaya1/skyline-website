import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { getIcon } from '../utils/icons.jsx';
import { useOptimizedViewport } from '../hooks/useOptimizedAnimation.js';
import OptimizedImage from './OptimizedImage.jsx';

// Importar datos desde archivos JSON
import categoriesData from '../data/categories.json';
import technologiesData from '../data/technologies.json';
import awsCertificationsData from '../data/awsCertifications.json';
import statsData from '../data/stats.json';
import configData from '../data/config.json';

// Componente memoizado para tarjetas de tecnología
const TechnologyCard = memo(({ tech, index }) => {
  // Configuración de animación optimizada (sin hook dentro del map)
  const animationDelay = Math.min(index * 0.05, 0.4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: animationDelay,
        ease: "easeOut"
      }}
      className="group relative h-auto md:h-48"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Card hover effect - simplificado */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-blue-800 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative bg-white rounded-2xl p-4 md:p-6 border border-gray-200 group-hover:border-transparent transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
        {/* Logo and Title Row */}
        <div className="flex items-center mb-3 md:mb-4 flex-shrink-0">
          <div className="relative mr-3 md:mr-4 flex-shrink-0">
            <div className="relative w-10 h-10 md:w-18 md:h-18 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <OptimizedImage
                src={tech.logo}
                alt={tech.name}
                className="w-8 h-8 md:w-12 md:h-12 object-contain transition-all duration-300 group-hover:scale-110"
                fallbackText={tech.name.charAt(0)}
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm md:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 leading-tight">
            {tech.name}
          </h3>
        </div>

        {/* Description - Ocupa el espacio restante */}
        <div className="flex-1 flex items-start">
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {tech.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

// Componente memoizado para estadísticas
const StatsSection = memo(({ stats, getColorClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
    className="mt-10 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
  >
    {stats.technologiesSection.map((stat, index) => (
      <div key={index} className="text-center">
        <div className={`text-2xl md:text-3xl lg:text-4xl font-bold ${getColorClass(stat.color)} mb-1 md:mb-2`}>{stat.value}</div>
        <div className="text-xs md:text-base text-gray-600">{stat.label}</div>
      </div>
    ))}
  </motion.div>
));

const Technologies = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  // Cargar datos desde archivos JSON
  const categories = categoriesData;
  const technologies = technologiesData;
  const awsCertifications = awsCertificationsData;
  const stats = statsData;
  const config = configData;

  // Configuraciones de animación optimizadas
  const titleAnimation = useOptimizedViewport(0);
  const gridAnimation = useOptimizedViewport(0.2);
  const statsAnimation = useOptimizedViewport(0.4);

  // Pausar carrusel en hover para mejorar UX
  const [isPaused, setIsPaused] = useState(false);

  // Escuchar eventos de filtrado desde otros componentes
  useEffect(() => {
    const handleFilterTechnologies = (event) => {
      const { category } = event.detail;
      setSelectedCategory(category);
      setShowAll(false); // Reset showAll cuando se filtra desde otro componente
    };

    window.addEventListener('filterTechnologies', handleFilterTechnologies);
    
    return () => {
      window.removeEventListener('filterTechnologies', handleFilterTechnologies);
    };
  }, []);

  // Auto-rotación del carrusel de certificaciones - OPTIMIZADA
  useEffect(() => {
    if (!awsCertifications?.length || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentCertIndex((prevIndex) => 
        prevIndex === awsCertifications.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Incrementado de 4s a 8s para reducir re-renders

    return () => clearInterval(interval);
  }, [awsCertifications?.length, isPaused]); // Añadido isPaused como dependencia

  const nextCertification = useCallback(() => {
    if (!awsCertifications?.length) return;
    setCurrentCertIndex((prevIndex) => 
      prevIndex === awsCertifications.length - 1 ? 0 : prevIndex + 1
    );
  }, [awsCertifications?.length]);

  const prevCertification = useCallback(() => {
    if (!awsCertifications?.length) return;
    setCurrentCertIndex((prevIndex) => 
      prevIndex === 0 ? awsCertifications.length - 1 : prevIndex - 1
    );
  }, [awsCertifications?.length]);

  // Memoizar cálculos pesados
  const filteredTechnologies = useMemo(() => {
    return selectedCategory === 'all' 
      ? (technologies || [])
      : (technologies || []).filter(tech => tech.category === selectedCategory);
  }, [selectedCategory, technologies]);

  const displayedTechnologies = useMemo(() => {
    return showAll 
      ? filteredTechnologies 
      : filteredTechnologies.slice(0, config?.display?.initialTechnologiesShown || 8);
  }, [showAll, filteredTechnologies, config?.display?.initialTechnologiesShown]);

  // Función memoizada para colores de estadísticas
  const getColorClass = useCallback((color) => {
    switch(color) {
      case 'blue-600': return 'text-blue-600';
      case 'orange-600': return 'text-orange-600';
      case 'green-600': return 'text-green-600';
      case 'purple-600': return 'text-purple-600';
      case 'yellow-600': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  }, []);

  const hasMoreTechnologies = useMemo(() => {
    return filteredTechnologies.length > (config?.display?.initialTechnologiesShown || 8);
  }, [filteredTechnologies.length, config?.display?.initialTechnologiesShown]);

  // Early return si no hay datos cargados
  if (!categories || !technologies || !awsCertifications || !stats || !config) {
    return (
      <section id="tecnologias" className="py-20 bg-blue-100 to-indigo-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Cargando tecnologías...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tecnologias" className={`${config.ui.sectionBackgroundClass} py-10 md:py-20`}>
      {/* Background decorative elements - optimizado (reducido blur) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-100/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-100/30 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          {...titleAnimation}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-bold ${config.ui.titleGradient} bg-clip-text text-transparent mb-4 md:mb-6 leading-tight`}>
            Nuestras Tecnologías
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 md:px-4">
            Utilizamos las <span className="text-blue-600 font-semibold">mejores herramientas</span> y
            tecnologías del mercado para entregar soluciones de alta calidad.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          {...useOptimizedViewport(0.1)}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-3 md:px-6 py-2 md:py-3 rounded-xl font-medium text-xs md:text-base transition-all duration-200 ${
                selectedCategory === category.id
                  ? `${config.ui.buttonGradient.active} text-white shadow-lg`
                  : `${config.ui.buttonGradient.inactive} shadow-sm border border-gray-200`
              }`}
              style={selectedCategory === category.id ? { transform: 'scale(1.05)' } : {}}
            >
              {getIcon(category.icon, { className: "w-4 h-4 md:w-5 md:h-5" })}
              <span className="ml-1 md:ml-2">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Technologies Grid - OPTIMIZADA */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {displayedTechnologies.map((tech, index) => (
            <TechnologyCard key={tech.name} tech={tech} index={index} />
          ))}
        </motion.div>

        {/* Show More/Less Button */}
        {hasMoreTechnologies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-6 md:mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-xl font-medium text-sm md:text-base hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {showAll ? (
                <>
                  <span className="mr-2">Ver Menos</span>
                  <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
                </>
              ) : (
                <>
                  <span className="mr-2">Ver Todas ({filteredTechnologies.length})</span>
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Stats Section */}
        <StatsSection stats={stats} getColorClass={getColorClass} />

        {/* AWS Certifications Section */}
        <motion.div
          {...useOptimizedViewport(0.3)}
          className="mt-10 md:mt-20"
        >
          <div className="text-center mb-6 md:mb-12">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-4 px-2">
              Ingenieros <span className="text-orange-600">AWS Certificados</span>
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Nuestro equipo cuenta con <span className="font-semibold text-orange-600">hasta 6+ certificaciones AWS</span>
              que avalan su expertise en la nube.
            </p>
          </div>

          {/* Carrusel de Certificaciones */}
          <div className="relative max-w-6xl mx-auto">
            {/* Contenedor principal del carrusel */}
            <div className="relative overflow-hidden rounded-2xl p-4 md:p-8"
                 onMouseEnter={() => setIsPaused(true)}
                 onMouseLeave={() => setIsPaused(false)}>

              {/* Botones de navegación */}
              <button
                onClick={prevCertification}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-blue-400 to-blue-700 shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>

              <button
                onClick={nextCertification}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-blue-400 to-blue-700 hover:bg-blue-500/30 shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>

              {/* Contenido del carrusel */}
              <div className="flex items-center justify-center px-8 md:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 items-center max-w-5xl w-full">

                  {/* Certificación anterior (solo visible en desktop) */}
                  <div className="hidden lg:block">
                    <div
                      key={`prev-${currentCertIndex}`}
                      className="text-center opacity-40 scale-90 transition-all duration-300"
                      style={{ willChange: 'opacity, transform' }}
                    >
                      <div className="relative mb-4">
                        <OptimizedImage
                          src={awsCertifications[(currentCertIndex - 1 + awsCertifications.length) % awsCertifications.length].image}
                          alt={awsCertifications[(currentCertIndex - 1 + awsCertifications.length) % awsCertifications.length].name}
                          className="w-24 h-24 mx-auto object-contain"
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">
                        {awsCertifications[(currentCertIndex - 1 + awsCertifications.length) % awsCertifications.length].name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {awsCertifications[(currentCertIndex - 1 + awsCertifications.length) % awsCertifications.length].level}
                      </span>
                    </div>
                  </div>

                  {/* Certificación actual (destacada) */}
                  <div className="relative">
                    <motion.div
                      key={`current-${currentCertIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-center"
                      style={{ willChange: 'opacity, transform' }}
                    >
                      <div className="relative mb-4 md:mb-6">
                        <OptimizedImage
                          src={awsCertifications[currentCertIndex].image}
                          alt={awsCertifications[currentCertIndex].name}
                          className="w-24 h-24 md:w-32 md:h-32 mx-auto object-contain"
                        />
                      </div>

                      <h4 className="text-base md:text-xl font-bold text-gray-900 mb-2">
                        {awsCertifications[currentCertIndex].name}
                      </h4>

                      <span className={`inline-block px-3 py-1 text-xs md:text-sm font-medium rounded-full bg-gradient-to-r ${awsCertifications[currentCertIndex].color} text-white`}>
                        {awsCertifications[currentCertIndex].level}
                      </span>
                    </motion.div>
                  </div>

                  {/* Certificación siguiente (solo visible en desktop) */}
                  <div className="hidden lg:block">
                    <div
                      key={`next-${currentCertIndex}`}
                      className="text-center opacity-40 scale-90 transition-all duration-300"
                      style={{ willChange: 'opacity, transform' }}
                    >
                      <div className="relative mb-4">
                        <OptimizedImage
                          src={awsCertifications[(currentCertIndex + 1) % awsCertifications.length].image}
                          alt={awsCertifications[(currentCertIndex + 1) % awsCertifications.length].name}
                          className="w-24 h-24 mx-auto object-contain"
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">
                        {awsCertifications[(currentCertIndex + 1) % awsCertifications.length].name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {awsCertifications[(currentCertIndex + 1) % awsCertifications.length].level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicadores de progreso */}
              <div className="flex justify-center mt-4 md:mt-8 space-x-2">
                {awsCertifications.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCertIndex(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentCertIndex
                        ? 'bg-orange-500 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Stats mejoradas */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-12">
              {stats.awsSection.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-transparent"
                >
                  <div className={`text-2xl md:text-3xl font-bold ${getColorClass(stat.color)} mb-1 md:mb-2`}>{stat.value}</div>
                  <div className="text-gray-600 text-xs md:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
