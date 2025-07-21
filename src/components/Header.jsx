import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SKY2Logo from '../assets/logos_skyline/SKY2.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed w-full bg-white/90 to-indigo-100/90 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
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

          <div className="hidden md:flex">
            <motion.button
              className="bg-gradient-to-r from-blue-300 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-400 hover:to-blue-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Consulta Gratuita
            </motion.button>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <nav className="flex flex-col space-y-4">
              {['Inicio', 'Servicios', 'Proceso', 'Contacto'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="bg-gradient-to-r  from-blue-500 to-blue-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
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