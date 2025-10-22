import { motion } from 'framer-motion';
import { ArrowRight, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getIcon } from '../utils/icons.jsx';

// Importar datos desde archivos JSON
import websitePlansData from '../data/websitePlans.json';

const DemosPreview = () => {
  const [selectedCategory, setSelectedCategory] = useState('websites');

  const categories = [
    { id: 'websites', label: 'Páginas Web', icon: '' },
    { id: 'ecommerce', label: 'Catálogos/Tienda en Línea', icon: '' }
  ];

  const websitePlans = websitePlansData;

  // Por ahora, los planes de ecommerce serán un placeholder
  const ecommercePlans = [];

  const currentPlans = selectedCategory === 'websites' ? websitePlans : ecommercePlans;

  return (
    <section id="demos" className="py-20 bg-white-100 to-indigo-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 via-gray-800 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
            Planes Skyline
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 mb-8">
            Soluciones digitales completas para tu negocio.
            <span className="text-blue-600 font-semibold"> Elige la categoría y encuentra tu plan ideal.</span>
          </p>

          {/* Filtro de categorías */}
          <div className="flex justify-center gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid de planes resumidos */}
        {currentPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {currentPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative ${plan.popular ? 'md:scale-105' : ''}`}
            >
              {/* Badge de Popular */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full shadow-lg flex items-center gap-1 text-xs font-semibold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Más Popular</span>
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col ${
                plan.popular ? 'border-2 border-orange-500' : 'border border-gray-200'
              }`}>
                {/* Header */}
                <div className={`bg-gradient-to-r ${plan.color} text-white p-6 text-center`}>
                  <div className="flex justify-center mb-3">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      {getIcon(plan.icon, { className: "w-8 h-8" })}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/90 text-sm mb-4">{plan.subtitle}</p>
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <div className="text-sm opacity-90">{plan.priceNote}</div>
                </div>

                {/* Contenido */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                  {/* Características principales (solo 3) */}
                  <div className="space-y-2 mb-6 flex-1">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className={`bg-gradient-to-r ${plan.color} p-0.5 rounded-full mt-1 flex-shrink-0`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <span className="text-gray-700">{feature.title}</span>
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <p className="text-sm text-gray-500 italic pl-4">
                        + {plan.features.length - 3} características más
                      </p>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    {/* Botón Ver Demo */}
                    {plan.id === 'presencia' && (
                      <a
                        href="/demos/plan-presencia/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium text-center hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver Demo
                      </a>
                    )}
                    {plan.id === 'impulso' && (
                      <a
                        href="/demos/plan-impulso/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium text-center hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver Demo
                      </a>
                    )}
                    {plan.id === 'expansion' && (
                      <a
                        href="/demos/plan-expansion/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium text-center hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver Demo
                      </a>
                    )}

                    <Link
                      to="/planes"
                      className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 rounded-lg font-semibold text-center hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                      Ver detalles
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <span className="text-5xl">🛒</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Planes de Catálogos y Tienda en Línea
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                Próximamente estaremos lanzando nuestros planes especializados en e-commerce.
              </p>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-blue-800 font-semibold mb-2">
                  ¿Interesado en una tienda en línea?
                </p>
                <p className="text-blue-700 text-sm mb-4">
                  Contáctanos y te ayudaremos a crear la solución perfecta para tu negocio.
                </p>
                <Link
                  to="/#contacto"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Contactar ahora
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Nota sobre dominio y hosting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-6 py-3 rounded-xl">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Todos nuestros planes incluyen dominio* y hosting en la nube durante el primer año</span>
          </div>
        </motion.div>

        {/* CTA principal para ver todos los planes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/planes"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Ver todos los planes en detalle
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-gray-600 text-sm mt-4">
            Conoce todas las características, beneficios y encuentra el plan ideal para ti
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DemosPreview;
