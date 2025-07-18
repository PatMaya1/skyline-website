import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      info: "contacto@skyline-consulting.com",
      subtitle: "Respuesta en menos de 24h"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfono",
      info: "+1 (555) 123-4567",
      subtitle: "Lun - Vie: 9:00 - 18:00"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Ubicación",
      info: "Consultoría Remota",
      subtitle: "Servicio en toda Latinoamérica"
    }
  ];

  const benefits = [
    "Análisis gratuito de 7 días",
    "Consulta inicial sin compromiso",
    "Propuesta personalizada",
    "Soporte continuo incluido"
  ];

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comienza Tu Transformación
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos listos para analizar tu negocio y mostrarte el potencial de mejora. 
            El primer paso es completamente gratuito.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-6">
                ¿Por qué elegir Skyline?
              </h3>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-white/10 p-3 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-lg">{item.info}</p>
                      <p className="text-sm opacity-80">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Respuesta Rápida</span>
                </div>
                <p className="text-sm opacity-90">
                  Nos comunicamos contigo en menos de 24 horas para programar 
                  tu análisis gratuito.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-8 h-8 text-primary-600" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Solicita tu Análisis Gratuito
                </h3>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Empresa *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Nombre de tu empresa"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tamaño de la empresa
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors">
                    <option>Selecciona el tamaño</option>
                    <option>1-10 empleados</option>
                    <option>11-50 empleados</option>
                    <option>51-200 empleados</option>
                    <option>200+ empleados</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cuéntanos sobre tu negocio *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Describe brevemente tu negocio y los principales desafíos que enfrentas..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Acepto que Skyline se comunique conmigo para coordinar el análisis 
                    gratuito y proporcionar información sobre sus servicios.
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-br from-blue-300 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Solicitar Análisis Gratuito</span>
                  <Send size={20} />
                </motion.button>
              </form>

              <p className="text-sm text-gray-500 text-center mt-4">
                * Campos obligatorios. Tu información está 100% protegida.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Prefieres hablar directamente?
            </h3>
            <p className="text-gray-600 mb-6">
              Llámanos o envíanos un WhatsApp para programar una videollamada 
              y conocer más sobre tu proyecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare size={20} />
                <span>WhatsApp</span>
              </motion.button>
              <motion.button
                className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} />
                <span>Llamar Ahora</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;