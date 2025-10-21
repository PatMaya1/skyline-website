import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Target } from 'lucide-react';

// Componente para las partículas animadas del fondo - OPTIMIZADO
const AnimatedBackground = () => {
  const particles = Array.from({ length: 4 }, (_, i) => i); // Reducido de 8 a 4
  const geometricShapes = Array.from({ length: 3 }, (_, i) => i); // Reducido de 5 a 3
  
  // Función para generar posiciones más distribuidas
  const generateDistributedPositions = (count) => {
    const positions = [];
    const minDistance = 20; // Distancia mínima entre nubes (en %)
    
    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let newPosition;
      
      do {
        newPosition = {
          left: Math.random() * 85 + 5,
          top: Math.random() * 85 + 5
        };
        attempts++;
      } while (
        attempts < 20 && // Máximo 20 intentos para evitar bucles infinitos
        positions.some(pos => 
          Math.abs(pos.left - newPosition.left) < minDistance &&
          Math.abs(pos.top - newPosition.top) < minDistance
        )
      );
      
      positions.push(newPosition);
    }
    
    return positions;
  };
  
  const cloudPositions = generateDistributedPositions(geometricShapes.length);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Partículas flotantes */}
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute bg-blue-400/50 rounded-full"
          style={{
            width: Math.random() * 80 + 30,
            height: Math.random() * 80 + 30,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100], // Reducido el rango de movimiento
            y: [0, Math.random() * 200 - 100], // Reducido el rango de movimiento
            scale: [1, 1.2, 1], // Reducida la escala
            opacity: [0.1, 0.3, 0.1], // Reducida la opacidad
          }}
          transition={{
            duration: Math.random() * 12 + 8, // Animaciones más lentas
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 6, // Delays más cortos
          }}
        />
      ))}
      
      {/* Formas de nubes orgánicas */}
      {geometricShapes.map((shape) => {
        const colors = ['blue/30', 'blue/25', 'blue/35', 'blue/20'];
        const cloudType = shape % 3;
        
        return (
          <motion.div
            key={shape}
            className="absolute"
            style={{
              left: `${cloudPositions[shape].left}%`,
              top: `${cloudPositions[shape].top}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1], // Reducida la opacidad
              x: [0, Math.random() * 60 - 30], // Reducido el movimiento
              y: [0, Math.random() * 40 - 20], // Reducido el movimiento
            }}
            transition={{
              duration: Math.random() * 20 + 15, // Animaciones más lentas
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 8, // Delays más cortos
            }}
          >
            {/* Nube tipo 1 - Pequeña */}
            {cloudType === 0 && (
              <div className="relative">
                <div className={`w-16 h-10 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute -top-2 left-3 w-12 h-8 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute -top-1 right-2 w-10 h-6 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute top-1 left-6 w-8 h-5 bg-${colors[shape % 4]} rounded-full`}></div>
              </div>
            )}
            
            {/* Nube tipo 2 - Mediana */}
            {cloudType === 1 && (
              <div className="relative">
                <div className={`w-20 h-12 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute -top-3 left-4 w-14 h-10 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute -top-2 right-3 w-12 h-8 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute top-2 left-8 w-10 h-6 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute top-0 left-12 w-8 h-5 bg-${colors[shape % 4]} rounded-full`}></div>
              </div>
            )}
            
            {/* Nube tipo 3 - Grande */}
            {cloudType === 2 && (
              <div className="relative">
                <div className={`w-24 h-14 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute -top-4 left-5 w-16 h-12 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute -top-3 right-4 w-14 h-10 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute -top-1 left-10 w-12 h-8 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute top-2 left-14 w-10 h-6 bg-${colors[shape % 4]} rounded-full`}></div>
                <div className={`absolute top-1 right-6 w-8 h-5 bg-${colors[shape % 4]} rounded-full`}></div>
              </div>
            )}
          </motion.div>
        );
      })}
      
      {/* Líneas decorativas animadas */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-0.5 bg-gradient-to-r from-blue/40 to-transparent"
        animate={{
          scaleX: [0.5, 1.2, 0.5],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-10 w-24 h-0.5 bg-gradient-to-l from-blue/40 to-transparent"
        animate={{
          scaleX: [0.8, 1.5, 0.8],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      
      {/* Puntos flotantes adicionales - OPTIMIZADO */}
      {Array.from({ length: 4 }, (_, i) => ( // Reducido de 8 a 4
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 bg-blue/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5], // Reducida la escala
            opacity: [0.1, 0.4, 0.1], // Reducida la opacidad
            y: [0, Math.random() * 30 - 15], // Reducido el movimiento
          }}
          transition={{
            duration: Math.random() * 8 + 6, // Animaciones más lentas
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3, // Delays más cortos
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center bg-blue-100 to-indigo-100 pt-20 relative">
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
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
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
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
            <div className="bg-gradient-to-r from-white-600 to-blue-300 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              
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
              
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;