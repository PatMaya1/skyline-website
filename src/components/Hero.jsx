import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Target } from 'lucide-react';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                ✨ Consultoría GRATUITA por tiempo limitado
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transformamos tu{' '}
              <span className="text-primary-600">negocio</span>{' '}
              con tecnología
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Automatizamos procesos y optimizamos operaciones para impulsar la productividad 
              de tu empresa. Comenzamos con una semana de análisis completamente gratuita.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                className="bg-primary-600 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('contacto')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                <span>Análisis Gratuito</span>
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-primary-600 hover:text-primary-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('servicios')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                Ver Servicios
              </motion.button>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-green-500" size={24} />
                <span className="text-gray-700 font-medium">+40% Productividad</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="text-blue-500" size={24} />
                <span className="text-gray-700 font-medium">100% Personalizado</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full -translate-y-6 translate-x-6"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-100 rounded-full translate-y-6 -translate-x-6"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¿Listo para revolucionar tu negocio?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Análisis completo de 7 días</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Propuesta personalizada</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Sin compromiso inicial</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    "Skyline transformó completamente nuestros procesos. En solo 3 meses 
                    aumentamos nuestra eficiencia en un 45%"
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-2">
                    - Cliente satisfecho
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;