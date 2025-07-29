import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { getIcon } from '../utils/icons.jsx';

// Importar datos desde archivos JSON
import categoriesData from '../data/categories.json';
import technologiesData from '../data/technologies.json';
import awsCertificationsData from '../data/awsCertifications.json';
import statsData from '../data/stats.json';
import configData from '../data/config.json';

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

  // Debug temporal - remover después
  console.log('Datos cargados:', {
    categories: categories?.length,
    technologies: technologies?.length,
    awsCertifications: awsCertifications?.length,
    stats: Object.keys(stats || {}),
    config: Object.keys(config || {})
  });

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

  // Auto-rotación del carrusel de certificaciones
  useEffect(() => {
    if (!awsCertifications?.length || !config?.carousel?.autoRotationInterval) return;
    
    const interval = setInterval(() => {
      setCurrentCertIndex((prevIndex) => 
        prevIndex === awsCertifications.length - 1 ? 0 : prevIndex + 1
      );
    }, config.carousel.autoRotationInterval);

    return () => clearInterval(interval);
  }, [awsCertifications?.length, config?.carousel?.autoRotationInterval]);

  const nextCertification = () => {
    if (!awsCertifications?.length) return;
    setCurrentCertIndex((prevIndex) => 
      prevIndex === awsCertifications.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCertification = () => {
    if (!awsCertifications?.length) return;
    setCurrentCertIndex((prevIndex) => 
      prevIndex === 0 ? awsCertifications.length - 1 : prevIndex - 1
    );
  };

  const filteredTechnologies = selectedCategory === 'all' 
    ? (technologies || [])
    : (technologies || []).filter(tech => tech.category === selectedCategory);

  const displayedTechnologies = showAll 
    ? filteredTechnologies 
    : filteredTechnologies.slice(0, config?.display?.initialTechnologiesShown || 8);

  const hasMoreTechnologies = filteredTechnologies.length > (config?.display?.initialTechnologiesShown || 8);

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
    <section id="tecnologias" className={config.ui.sectionBackgroundClass}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-6xl font-bold ${config.ui.titleGradient} bg-clip-text text-transparent mb-6 leading-tight`}>
            Nuestras Tecnologías
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Utilizamos las <span className="text-blue-600 font-semibold">mejores herramientas</span> y 
            tecnologías del mercado para entregar soluciones de alta calidad.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? `${config.ui.buttonGradient.active} text-white shadow-lg scale-105`
                  : `${config.ui.buttonGradient.inactive} shadow-sm border border-gray-200`
              }`}
            >
              {getIcon(category.icon, { className: "w-5 h-5" })}
              <span className="ml-2">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {displayedTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * config.display.animationDelayMultiplier }}
              className="group relative h-48" // Altura fija para todas las tarjetas
            >
              {/* Card hover effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-blue-800 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              
              <div className="relative bg-white rounded-2xl p-6 border border-gray-200 group-hover:border-transparent transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
                {/* Logo and Title Row */}
                <div className="flex items-center mb-4 flex-shrink-0">
                  <div className="relative mr-4 flex-shrink-0">
                    <div className={`absolute inset-0 bg-transparent rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative w-18 h-18 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={tech.logo} 
                        alt={tech.name} 
                        className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110"
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

                {/* Description - Ocupa el espacio restante */}
                <div className="flex-1 flex items-start">
                  <p className="text-gray-600 text-m leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {tech.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More/Less Button */}
        {hasMoreTechnologies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {showAll ? (
                <>
                  <span className="mr-2">Ver Menos</span>
                  <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  <span className="mr-2">Ver Todas las Tecnologías ({filteredTechnologies.length})</span>
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.technologiesSection.map((stat, index) => {
            const getColorClass = (color) => {
              switch(color) {
                case 'blue-600': return 'text-blue-600';
                case 'orange-600': return 'text-orange-600';
                case 'green-600': return 'text-green-600';
                case 'purple-600': return 'text-purple-600';
                case 'yellow-600': return 'text-yellow-600';
                default: return 'text-gray-600';
              }
            };
            
            return (
              <div key={index} className="text-center">
                <div className={`text-3xl lg:text-4xl font-bold ${getColorClass(stat.color)} mb-2`}>{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* AWS Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ingenieros <span className="text-orange-600">AWS Certificados</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestro equipo cuenta con <span className="font-semibold text-orange-600">hasta 6+ certificaciones AWS</span> 
              que avalan su expertise en la nube.
            </p>
          </div>

          {/* Carrusel de Certificaciones */}
          <div className="relative max-w-6xl mx-auto">
            {/* Contenedor principal del carrusel */}
            <div className="relative overflow-hidden rounded-2xl p-8">
              
              {/* Botones de navegación */}
              <button
                onClick={prevCertification}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-blue-400 to-blue-700 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              
              <button
                onClick={nextCertification}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-blue-400 to-blue-700 hover:bg-blue-500/30 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>

              {/* Contenido del carrusel */}
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-5xl">
                  
                  {/* Certificación anterior (solo visible en desktop) */}
                  <div className="hidden lg:block">
                    <motion.div
                      key={`prev-${currentCertIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.4, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="relative mb-4">
                        <img 
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
                    </motion.div>
                  </div>

                  {/* Certificación actual (destacada) */}
                  <div className="relative">
                    <motion.div
                      key={`current-${currentCertIndex}`}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-center"
                    >
                      <div className="relative mb-6">
                        <img 
                          src={awsCertifications[currentCertIndex].image}
                          alt={awsCertifications[currentCertIndex].name}
                          className="w-32 h-32 mx-auto object-contain"
                        />
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {awsCertifications[currentCertIndex].name}
                      </h4>
                      
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${awsCertifications[currentCertIndex].color} text-white`}>
                        {awsCertifications[currentCertIndex].level}
                      </span>
                    </motion.div>
                  </div>

                  {/* Certificación siguiente (solo visible en desktop) */}
                  <div className="hidden lg:block">
                    <motion.div
                      key={`next-${currentCertIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.4, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="relative mb-4">
                        <img 
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
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Indicadores de progreso */}
              <div className="flex justify-center mt-8 space-x-2">
                {awsCertifications.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCertIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentCertIndex 
                        ? 'bg-orange-500 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Stats mejoradas */}
            <div className="flex justify-center gap-6 mt-12">
              {stats.awsSection.map((stat, index) => {
                const getColorClass = (color) => {
                  switch(color) {
                    case 'blue-600': return 'text-blue-600';
                    case 'orange-600': return 'text-orange-600';
                    case 'green-600': return 'text-green-600';
                    case 'purple-600': return 'text-purple-600';
                    case 'yellow-600': return 'text-yellow-600';
                    default: return 'text-gray-600';
                  }
                };
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: config.display.animationDelayMultiplier * (index + 1) }}
                    className="text-center bg-transparent"
                  >
                    <div className={`text-3xl font-bold ${getColorClass(stat.color)} mb-2`}>{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
