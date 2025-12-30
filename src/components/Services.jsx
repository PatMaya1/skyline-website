import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Cog, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  Smartphone,
  Gift,
  Clock,
  Code,
  Database,
  Server,
  Cloud,
  Monitor,
  Globe
} from 'lucide-react';

const Services = () => {
  const [selectedTech, setSelectedTech] = useState('all');

  const services = [
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Automatización de Procesos",
      description: "Eliminamos tareas repetitivas y optimizamos flujos de trabajo para aumentar la eficiencia operacional.",
      features: ["Workflows automatizados", "Integración de sistemas", "Reducción de errores manuales"],
      techCategory: "automatizacion"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Análisis de Datos",
      description: "Convertimos datos en insights accionables para tomar decisiones estratégicas informadas.",
      features: ["Dashboards personalizados", "Reportes automatizados", "Predicciones de tendencias"],
      techCategory: "analisis"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Optimización de Rendimiento",
      description: "Mejoramos la velocidad y eficiencia de sistemas existentes para maximizar la productividad.",
      features: ["Auditoría de sistemas", "Optimización de bases de datos", "Mejora de interfaces"],
      techCategory: "optimizacion"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seguridad Digital",
      description: "Protegemos tu negocio con soluciones de seguridad robustas y actualizadas.",
      features: ["Auditorías de seguridad", "Implementación de protocolos", "Monitoreo continuo"],
      techCategory: "seguridad"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gestión de Equipos",
      description: "Herramientas colaborativas que mejoran la comunicación y productividad del equipo.",
      features: ["Plataformas colaborativas", "Gestión de proyectos", "Comunicación integrada"],
      techCategory: "equipos"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Soluciones Móviles",
      description: "Aplicaciones y sistemas móviles que mantienen tu negocio conectado en cualquier lugar.",
      features: ["Apps nativas", "Sistemas responsive", "Sincronización en tiempo real"],
      techCategory: "moviles"
    }
  ];

  const handleServiceClick = (techCategory) => {
    // Navegar a la sección de tecnologías
    const technologiesSection = document.getElementById('tecnologias');
    if (technologiesSection) {
      technologiesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Enviar evento personalizado para filtrar las tecnologías
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('filterTechnologies', { 
          detail: { category: techCategory } 
        }));
      }, 800); // Esperar a que termine la animación de scroll
    }
  };

  return (
    <section id="servicios" className="py-10 md:py-20 bg-gradient-to-br from-blue-100 to-indigo-100 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent mb-4 md:mb-6">
            Soluciones que Transforman
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Ofrecemos soluciones integrales de consultoría tecnológica diseñadas
            para <span className="text-blue-600 font-semibold">transformar y optimizar</span> tu negocio desde el primer día.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group cursor-pointer"
              onClick={() => handleServiceClick(service.techCategory)}
            >
              {/* Card background with gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 md:p-8 border border-gray-100 group-hover:border-transparent transform group-hover:-translate-y-1"> {/* Reducido de -translate-y-2 a -translate-y-1 */}
                {/* Icon and title in the same row */}
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="relative mr-3 md:mr-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-300 to-blue-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-base md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>

                <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-xs md:text-sm text-gray-700">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-blue-500 to-blue-800 rounded-full mr-2 md:mr-3 flex-shrink-0"></div>
                      <span className="group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100 group-hover:border-blue-100 transition-colors duration-300">
                  <span className="text-xs md:text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                    Ver Tecnologías
                  </span>
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-gradient-to-tl from-blue-700 via-blue-500 to-blue-900 rounded-3xl p-6 md:p-8 lg:p-12 text-white text-center"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-black/10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}></div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-300/20 rounded-full blur-lg"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-center mb-4 md:mb-6">
              <div className="bg-white/20 rounded-2xl p-2 md:p-3 mb-2 md:mb-0 md:mr-4">
                <Gift className="w-8 h-8 md:w-12 md:h-12" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Oferta de Lanzamiento
              </h3>
            </div>

            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed px-2">
              Para celebrar el inicio de Skyline, ofrecemos una semana completa de
              análisis y consultoría completamente <span className="font-bold text-yellow-300">GRATUITA</span> para los primeros clientes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="bg-white/20 rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <Clock className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="font-semibold mb-1 md:mb-2 text-base md:text-lg">5 Días Completos</h4>
                <p className="text-xs md:text-sm opacity-80">Análisis exhaustivo de tu negocio</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="bg-white/20 rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="font-semibold mb-1 md:mb-2 text-base md:text-lg">Propuesta Detallada</h4>
                <p className="text-xs md:text-sm opacity-80">Plan de mejora personalizado</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="bg-white/20 rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <Shield className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="font-semibold mb-1 md:mb-2 text-base md:text-lg">Sin Compromiso</h4>
                <p className="text-xs md:text-sm opacity-80">Decide después del análisis</p>
              </div>
            </div>

            <motion.button
              className="bg-white text-blue-400 px-6 md:px-10 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              Solicitar Análisis Gratuito
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;