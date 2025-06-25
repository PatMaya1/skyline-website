import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Lightbulb, 
  Rocket, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  Users
} from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Análisis Profundo",
      duration: "Días 1-3",
      description: "Estudiamos cada aspecto de tu negocio: procesos, sistemas, flujos de trabajo y puntos de dolor.",
      details: [
        "Revisión de procesos actuales",
        "Identificación de cuellos de botella",
        "Análisis de herramientas existentes",
        "Entrevistas con equipo clave"
      ]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Documentación",
      duration: "Días 4-5",
      description: "Creamos un mapa detallado de oportunidades y áreas de mejora específicas para tu empresa.",
      details: [
        "Informe de situación actual",
        "Mapeo de procesos críticos",
        "Identificación de oportunidades",
        "Análisis de ROI potencial"
      ]
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Propuesta Personalizada",
      duration: "Días 6-7",
      description: "Desarrollamos una estrategia única con soluciones específicas y métricas de éxito claras.",
      details: [
        "Plan de implementación detallado",
        "Cronograma de desarrollo",
        "Presupuesto transparente",
        "Métricas de éxito esperadas"
      ]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Implementación",
      duration: "Fase 2",
      description: "Si decides continuar, ejecutamos las mejoras con seguimiento constante y soporte completo.",
      details: [
        "Desarrollo e implementación",
        "Capacitación del equipo",
        "Pruebas y optimización",
        "Soporte continuo"
      ]
    }
  ];

  return (
    <section id="proceso" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nuestro Proceso
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Una metodología probada que garantiza resultados tangibles. 
            Comenzamos con 7 días de análisis gratuito para entender tu negocio a fondo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-blue-300 to-blue-700 text-white rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Calendar className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Semana de Análisis GRATUITA</h3>
              </div>
              
              <p className="text-lg mb-6 opacity-90">
                Invertimos una semana completa en conocer tu negocio sin costo alguno. 
                Esta es nuestra forma de demostrar el valor que podemos aportar.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">40+ Horas</h4>
                  <p className="text-sm opacity-80">De análisis dedicado</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">100% Gratis</h4>
                  <p className="text-sm opacity-80">Sin compromisos</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm">Equipo de consultores senior</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              ¿Por qué ofrecemos esto gratis?
            </h3>
            
            <div className="space-y-4">
              {[
                "Creemos en demostrar valor antes de pedir inversión",
                "Queremos entender completamente tu negocio",
                "Es nuestra forma de construir confianza",
                "Nos permite crear propuestas más precisas"
              ].map((reason, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{reason}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 relative"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                <div className="flex items-center space-x-4 mb-6 lg:mb-0">
                  <div className="bg-primary-100 text-primary-600 p-4 rounded-xl">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <p className="text-primary-600 font-semibold">{step.duration}</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <ArrowRight className="w-6 h-6 text-primary-600 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-gray-600 mb-6">
              No tienes nada que perder y mucho que ganar. Comenzamos tu análisis 
              gratuito esta misma semana.
            </p>
            <motion.button
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg  hover:bg-primary-700 transition-colors duration-200 inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <span>Iniciar Análisis Gratuito</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;