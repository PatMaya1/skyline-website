import { motion } from 'framer-motion';
import { useState, memo } from 'react';
import { Check, Star, Clock, ChevronDown, ChevronUp, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getIcon } from '../utils/icons.jsx';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Importar datos desde archivos JSON
import websitePlansData from '../data/websitePlans.json';
import ecommercePlansData from '../data/ecommercePlans.json';
import maintenanceData from '../data/maintenance.json';

const categories = [
  { id: 'websites', label: 'Páginas Web', icon: '' },
  { id: 'ecommerce', label: 'Catálogos/Tienda en Línea', icon: '' }
];

// Componente memoizado para cada plan
const PlanCard = memo(({ plan, index }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const animationDelay = index * 0.15;
  const displayedFeatures = showAllFeatures ? plan.features : plan.features.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={`relative group ${plan.popular ? 'lg:scale-105 lg:z-10' : ''}`}
    >
      {/* Badge de Popular */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold text-sm">Más Popular</span>
          </div>
        </div>
      )}

      {/* Card principal */}
      <div className={`relative h-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
        plan.popular ? 'border-2 border-orange-500' : 'border border-gray-200'
      }`}>
        {/* Header del plan con gradiente */}
        <div className={`bg-gradient-to-r ${plan.color} text-white p-8 pb-6`}>
          <div className="flex items-start justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              {getIcon(plan.icon, { className: "w-8 h-8" })}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{plan.price}</div>
              <div className="text-sm opacity-90">{plan.priceNote}</div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <p className="text-white/90 text-sm font-medium">{plan.subtitle}</p>
        </div>

        {/* Contenido del plan */}
        <div className="p-8">
          {/* Descripción */}
          <p className="text-gray-600 mb-6">{plan.description}</p>

          {/* Tiempo de entrega */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Entrega en {plan.delivery}</span>
          </div>

          {/* Incluye plan anterior */}
          {plan.includesPrevious && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                ✨ Incluye todo del Plan {plan.includesPrevious === 'presencia' ? 'Presencia' : 'Impulso'}, más:
              </p>
            </div>
          )}

          {/* Features */}
          <div className="space-y-3 mb-6">
            {displayedFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 group/feature">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`bg-gradient-to-r ${plan.color} p-1 rounded-full`}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm group-hover/feature:text-blue-600 transition-colors">
                    {feature.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón Ver más/menos features */}
          {plan.features.length > 4 && (
            <button
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium mb-6 py-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {showAllFeatures ? (
                <>
                  <span>Ver menos</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Ver {plan.features.length - 4} características más</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}

          {/* Beneficio principal */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">🎯 Beneficio real:</p>
            <p className="text-sm text-gray-600">{plan.benefit}</p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            {/* Botón Ver Demo */}
            {plan.id === 'presencia' && (
              <a
                href="/demos/plan-presencia/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white border-2 border-current text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                Ver Demo en Vivo
              </a>
            )}
            {plan.id === 'impulso' && (
              <a
                href="/demos/plan-impulso/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white border-2 border-current text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                Ver Demo en Vivo
              </a>
            )}
            {plan.id === 'expansion' && (
              <a
                href="/demos/plan-expansion/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white border-2 border-current text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                Ver Demo en Vivo
              </a>
            )}
            {plan.id === 'catalogo-digital' && (
              <a
                href="/demos/plan-catalogo-digital/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white border-2 border-current text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                Ver Demo en Vivo
              </a>
            )}
            {plan.id === 'tienda-online' && (
              <a
                href="/demos/plan-tienda-online/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white border-2 border-current text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                Ver Demo en Vivo
              </a>
            )}

            {/* Botón Solicitar */}
            <a
              href="/#contacto"
              className={`block w-full bg-gradient-to-r ${plan.color} text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center`}
            >
              Solicitar {plan.name}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const PlanesDetalle = () => {
  const [selectedCategory, setSelectedCategory] = useState('websites');

  const websitePlans = websitePlansData;
  const ecommercePlans = ecommercePlansData;
  const maintenance = maintenanceData;

  const currentPlans = selectedCategory === 'websites' ? websitePlans : ecommercePlans;

  return (
    <div className="min-h-screen">
      <Header />

      {/* Espaciador para el header fijo */}
      <div className="h-20"></div>

      <section className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Botón volver */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al inicio
            </Link>
          </motion.div>

          {/* Header de la sección */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 via-gray-800 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
              Planes Skyline
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 mb-8">
              Elige el plan perfecto para llevar tu negocio al siguiente nivel.
              <span className="text-blue-600 font-semibold"> Desde presencia básica hasta automatización completa.</span>
            </p>

            {/* Filtro de categorías */}
            <div className="flex justify-center gap-4 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl transform scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Grid de planes */}
          {currentPlans.length > 0 ? (
            <div className={`grid grid-cols-1 gap-8 mb-12 ${
              currentPlans.length === 1 ? 'lg:grid-cols-1 max-w-md mx-auto' :
              currentPlans.length === 2 ? 'lg:grid-cols-2 max-w-5xl mx-auto' :
              'lg:grid-cols-3'
            }`}>
              {currentPlans.map((plan, index) => (
                <PlanCard key={plan.id} plan={plan} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center py-20 mb-12"
            >
              <div className="max-w-2xl mx-auto">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-6xl">🛒</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Planes de Catálogos y Tienda en Línea
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Próximamente estaremos lanzando nuestros planes especializados en e-commerce con todas las herramientas necesarias para vender en línea.
                </p>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 max-w-lg mx-auto">
                  <p className="text-blue-800 font-bold text-lg mb-3">
                    ¿Interesado en una tienda en línea?
                  </p>
                  <p className="text-blue-700 mb-6">
                    Contáctanos y te ayudaremos a crear la solución perfecta para tu negocio. Ofrecemos soluciones personalizadas de e-commerce.
                  </p>
                  <Link
                    to="/#contacto"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Contactar ahora
                    <ArrowLeft className="w-6 h-6 rotate-180" />
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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 border-2 border-blue-200 text-blue-800 px-8 py-4 rounded-xl shadow-md">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold text-lg">Todos nuestros planes incluyen dominio y hosting* en la nube durante el primer año</span>
            </div>
          </motion.div>

          {/* Sección de mantenimiento */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="text-white">
                    <div className="flex items-center gap-3 mb-4">
                      {getIcon(maintenance.service.icon, { className: "w-10 h-10" })}
                      <h3 className="text-3xl font-bold">{maintenance.title}</h3>
                    </div>
                    <p className="text-xl font-semibold mb-4">{maintenance.service.name}</p>
                    <p className="text-white/90 mb-6">{maintenance.service.description}</p>

                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-bold">{maintenance.service.price}</span>
                      <span className="text-white/80 text-lg">{maintenance.service.priceNote}</span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="text-white font-semibold mb-4 text-lg">Incluye:</h4>
                    <ul className="space-y-3">
                      {maintenance.service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-white">
                          <div className="bg-white/20 p-1 rounded-full flex-shrink-0">
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/#contacto"
                      className="block w-full mt-6 bg-white text-green-700 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center"
                    >
                      Contratar Mantenimiento
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nota final */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 text-sm mb-6">
              💡 <span className="font-semibold">¿No estás seguro cuál plan elegir?</span> Contáctanos y te ayudaremos a encontrar la mejor opción para tu negocio.
            </p>
            <Link
              to="/#contacto"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Contáctanos ahora
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlanesDetalle;
