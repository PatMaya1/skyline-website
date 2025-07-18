import { motion } from 'framer-motion';
import { 
  Cog, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  Smartphone,
  Gift,
  Clock
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Automatización de Procesos",
      description: "Eliminamos tareas repetitivas y optimizamos flujos de trabajo para aumentar la eficiencia operacional.",
      features: ["Workflows automatizados", "Integración de sistemas", "Reducción de errores manuales"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Análisis de Datos",
      description: "Convertimos datos en insights accionables para tomar decisiones estratégicas informadas.",
      features: ["Dashboards personalizados", "Reportes automatizados", "Predicciones de tendencias"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Optimización de Rendimiento",
      description: "Mejoramos la velocidad y eficiencia de sistemas existentes para maximizar la productividad.",
      features: ["Auditoría de sistemas", "Optimización de bases de datos", "Mejora de interfaces"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seguridad Digital",
      description: "Protegemos tu negocio con soluciones de seguridad robustas y actualizadas.",
      features: ["Auditorías de seguridad", "Implementación de protocolos", "Monitoreo continuo"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gestión de Equipos",
      description: "Herramientas colaborativas que mejoran la comunicación y productividad del equipo.",
      features: ["Plataformas colaborativas", "Gestión de proyectos", "Comunicación integrada"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Soluciones Móviles",
      description: "Aplicaciones y sistemas móviles que mantienen tu negocio conectado en cualquier lugar.",
      features: ["Apps nativas", "Sistemas responsive", "Sincronización en tiempo real"]
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos soluciones integrales de consultoría tecnológica diseñadas 
            para transformar y optimizar tu negocio desde el primer día.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 group"
            >
              <div className="text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-blue-300 rounded-2xl p-8 lg:p-12 text-white text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <Gift className="w-12 h-12 mr-4" />
            <h3 className="text-3xl lg:text-4xl font-bold">
              Oferta de Lanzamiento
            </h3>
          </div>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Para celebrar el inicio de Skyline, ofrecemos una semana completa de 
            análisis y consultoría completamente GRATUITA para los primeros clientes.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-6">
              <Clock className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">5 Días Completos</h4>
              <p className="text-sm opacity-80">Análisis exhaustivo de tu negocio</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <BarChart3 className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Propuesta Detallada</h4>
              <p className="text-sm opacity-80">Plan de mejora personalizado</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <Shield className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Sin Compromiso</h4>
              <p className="text-sm opacity-80">Decide después del análisis</p>
            </div>
          </div>
          
          <motion.button
            className="bg-white/10 text-primary-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors duration-200 "
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
        
        </motion.div>
      </div>
    </section>
  );
};

export default Services;