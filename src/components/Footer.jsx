import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Contacto', href: '#contacto' }
  ];

  const services = [
    'Automatización de Procesos',
    'Análisis de Datos',
    'Optimización de Rendimiento',
    'Seguridad Digital',
    'Gestión de Equipos',
    'Soluciones Móviles'
  ];

  return (
    <footer className="bg-gray-800 to-indigo-100 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary-400">Sky</span>line
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transformamos negocios a través de la tecnología. Comenzamos con 
              una semana de análisis completamente gratuita para demostrar nuestro valor.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Linkedin size={20} />, href: '#' },
                { icon: <Twitter size={20} />, href: '#' },
                { icon: <Facebook size={20} />, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="bg-gray-800 p-3 rounded-lg hover:bg-primary-600 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6">Servicios</h4>
            <ul className="space-y-3">
              {services.slice(0, 4).map((service, index) => (
                <li key={index}>
                  <span className="text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-400" />
                <span className="text-gray-400">contacto@skylineit.mx</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-400" />
                <span className="text-gray-400">+52 (844) 770 4943 </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-primary-400" />
                <span className="text-gray-400">Consultoría Remota</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h5 className="font-semibold text-primary-400 mb-2">
                Análisis Gratuito
              </h5>
              <p className="text-sm text-gray-400 mb-3">
                7 días de consultoría sin costo
              </p>
              <motion.button
                className="bg-primary-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-primary-700 transition-colors duration-200 w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar Ahora
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>&copy; 2024 Skyline Consulting. Todos los derechos reservados.</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-primary-400 transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors duration-200">
                Términos de Servicio
              </a>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="bg-primary-600 p-3 rounded-full hover:bg-primary-700 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Volver arriba"
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;