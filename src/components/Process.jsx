import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Lightbulb, 
  Rocket, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  Users,
  Target,
  TrendingUp
} from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Descubrimiento",
      subtitle: "Entendemos tu negocio",
      duration: "Días 1-3",
      description: "Realizamos un análisis profundo de tu empresa para identificar oportunidades de mejora.",
      benefits: [
        "Mapeo completo de procesos",
        "Identificación de ineficiencias",
        "Análisis de competencia",
        "Evaluación de recursos actuales"
      ],
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Estrategia",
      subtitle: "Diseñamos la solución",
      duration: "Días 4-7",
      description: "Creamos un plan personalizado con soluciones específicas para tus necesidades.",
      benefits: [
        "Propuesta técnica detallada",
        "Roadmap de implementación",
        "Análisis de costo-beneficio",
        "Cronograma realista"
      ],
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Ejecución",
      subtitle: "Implementamos las mejoras",
      duration: "2-8 Semanas",
      description: "Desarrollamos y desplegamos las soluciones con metodología ágil y seguimiento continuo.",
      benefits: [
        "Desarrollo iterativo",
        "Pruebas en tiempo real",
        "Capacitación del equipo",
        "Ajustes sobre la marcha"
      ],
      color: "from-green-500 to-green-700"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Optimización",
      subtitle: "Garantizamos el éxito",
      duration: "Continuo",
      description: "Monitoreamos resultados y optimizamos continuamente para maximizar el retorno de inversión.",
      benefits: [
        "Monitoreo de KPIs",
        "Optimización continua",
        "Soporte técnico 24/7",
        "Actualizaciones regulares"
      ],
      color: "from-orange-500 to-orange-700"
    }
  ];

  return (
    <section id="proceso" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Cómo Transformamos Tu Negocio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un proceso estructurado de 4 fases que garantiza resultados medibles.
            <span className="block mt-2 text-primary-600 font-semibold">
              Comenzamos con 7 días de análisis completamente gratuito.
            </span>
          </p>
        </motion.div>

        {/* Análisis Gratuito Destacado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-blue-400 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Calendar className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold">Análisis GRATUITO de 7 días</h3>
                </div>
                <p className="text-lg mb-6 opacity-90">
                  Invertimos una semana completa estudiando tu negocio sin costo. 
                  Esta es nuestra forma de demostrar el valor que podemos aportar.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <h4 className="font-semibold mb-2">40+ Horas</h4>
                    <p className="text-sm opacity-80">De análisis dedicado</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <h4 className="font-semibold mb-2">100% Gratis</h4>
                    <p className="text-sm opacity-80">Sin compromisos</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-bold mb-4">¿Por qué lo hacemos gratis?</h4>
                {[
                  "Demostramos valor antes de cualquier inversión",
                  "Entendemos completamente tu negocio",
                  "Construimos confianza desde el día uno",
                  "Creamos propuestas más precisas y efectivas"
                ].map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                    <p className="text-sm opacity-90">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Proceso paso a paso */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex items-center gap-12`}
            >
              {/* Contenido del paso */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 relative">
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`bg-gradient-to-r ${step.color} text-white p-3 rounded-xl`}>
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        <p className="text-primary-600 font-semibold">{step.subtitle}</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 inline-block px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {step.duration}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg">{step.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {step.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full`}></div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Ilustración visual */}
              <div className="flex-1 flex justify-center">
                <div className={`bg-gradient-to-br ${step.color} rounded-3xl p-8 text-white min-h-80 flex flex-col justify-center items-center relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-12 h-12 text-white">
                          {step.icon}
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-white/80">{step.subtitle}</p>
                    </div>
                    
                    <div className="space-y-3">
                      {step.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                          <p className="text-sm font-medium">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Flecha conectora */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-8">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white rotate-90" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-500 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-600/10 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                ¿Listo para transformar tu negocio?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                No arriesgues nada. Comenzamos con 7 días de análisis completamente gratuito 
                para mostrarte el potencial de tu empresa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 inline-flex items-center space-x-2 shadow-lg"
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
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Sin compromiso</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>100% gratis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;