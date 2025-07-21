// Importaciones necesarias para el componente Header
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SKY2Logo from '../assets/logos_skyline/SKY2.png';

/**
 * Componente Header - Barra de navegación principal
 * Incluye logo, menú de navegación, botón CTA y menú móvil hamburguesa
 */
const Header = () => {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del menú móvil
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    // Header principal - Fijo en la parte superior con backdrop blur
    <header className="fixed w-full bg-white/90 to-indigo-100/90 backdrop-blur-md z-50 shadow-sm">
      {/* Contenedor principal con max-width y padding responsivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container para distribuir elementos horizontalmente */}
        <div className="flex justify-between items-center py-4">
          
          {/* SECCIÓN 1: Logo de la empresa */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <img 
              src={SKY2Logo} 
              alt="SkyLine Logo" 
              className="h-10 w-auto"
            />
          </motion.div>

          {/* SECCIÓN 2: Menú de navegación principal (oculto en móvil) */}
          <nav className="hidden md:flex space-x-8">
            {['Inicio', 'Servicios', 'Proceso', 'Contacto'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 font-medium transition-all duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* SECCIÓN 3: Botón CTA principal (oculto en móvil) */}
          <div className="hidden md:flex">
            <motion.button
              className="bg-gradient-to-r from-blue-300 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-400 hover:to-blue-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Consulta Gratuita
            </motion.button>
          </div>

          {/* SECCIÓN 4: Botón hamburguesa para menú móvil (solo visible en móvil) */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* SECCIÓN 5: Menú móvil desplegable (solo visible cuando isOpen es true) */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {/* Navegación vertical para móvil */}
            <nav className="flex flex-col space-y-4">
              {/* Enlaces de navegación móvil */}
              {['Inicio', 'Servicios', 'Proceso', 'Contacto'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="bg-gradient-to-r  from-blue-500 to-blue-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 font-medium"
                  onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
                >
                  {item}
                </a>
              ))}
              {/* Botón CTA para móvil */}
              <button className="bg-gradient-to-r from-blue-300 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-400 hover:to-blue-600 transition-all duration-200 w-full">
                Consulta Gratuita
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;