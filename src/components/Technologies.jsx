import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Globe,
  Smartphone,
  Shield,
  BarChart3,
  Cog,
  Users,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Technologies = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);

  // Escuchar eventos de filtrado desde otros componentes
  useEffect(() => {
    const handleFilterTechnologies = (event) => {
      const { category } = event.detail;
      setSelectedCategory(category);
      setShowAll(false); // Reset showAll cuando se filtra desde otro componente
    };

    window.addEventListener('filterTechnologies', handleFilterTechnologies);
    
    return () => {
      window.removeEventListener('filterTechnologies', handleFilterTechnologies);
    };
  }, []);

  const categories = [
    { id: 'all', name: 'Todas las Tecnologías', icon: <Globe className="w-5 h-5" /> },
    { id: 'automatizacion', name: 'Automatización', icon: <Cog className="w-5 h-5" /> },
    { id: 'analisis', name: 'Análisis de Datos', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'optimizacion', name: 'Optimización', icon: <Zap className="w-5 h-5" /> },
    { id: 'seguridad', name: 'Seguridad', icon: <Shield className="w-5 h-5" /> },
    { id: 'equipos', name: 'Gestión de Equipos', icon: <Users className="w-5 h-5" /> },
    { id: 'moviles', name: 'Soluciones Móviles', icon: <Smartphone className="w-5 h-5" /> }
  ];  const technologies = [
    // Automatización de Procesos
    {
      name: 'Python',
      category: 'automatizacion',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      description: 'Automatización de procesos con scripts y workflows',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'Node.js',
      category: 'automatizacion',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      description: 'APIs y microservicios para automatización',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Zapier',
      category: 'automatizacion',
      logo: 'https://www.zapier.com/favicon.ico',
      description: 'Integración automática entre aplicaciones',
      color: 'from-orange-400 to-orange-600'
    },
    {
      name: 'Microsoft Power Automate',
      category: 'automatizacion',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Microsoft_Power_Automate.svg',
      description: 'Automatización empresarial en el ecosistema Microsoft',
      color: 'from-blue-400 to-blue-600'
    },

    // Análisis de Datos
    {
      name: 'Power BI',
      category: 'analisis',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
      description: 'Dashboards y reportes interactivos',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'Tableau',
      category: 'analisis',
      logo: 'https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png',
      description: 'Visualización avanzada de datos',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Google Analytics',
      category: 'analisis',
      logo: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg',
      description: 'Análisis de comportamiento web',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'SQL Server',
      category: 'analisis',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
      description: 'Gestión y análisis de bases de datos',
      color: 'from-red-400 to-red-600'
    },
    {
      name: 'Pandas',
      category: 'analisis',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
      description: 'Análisis de datos con Python',
      color: 'from-purple-400 to-purple-600'
    },

    // Optimización de Rendimiento
    {
      name: 'Redis',
      category: 'optimizacion',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      description: 'Cache en memoria para mejor rendimiento',
      color: 'from-red-400 to-red-600'
    },
    {
      name: 'MongoDB',
      category: 'optimizacion',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      description: 'Base de datos NoSQL optimizada',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'AWS CloudFront',
      category: 'optimizacion',
      logo: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png',
      description: 'CDN para optimización de contenido',
      color: 'from-orange-400 to-orange-600'
    },
    {
      name: 'Docker',
      category: 'optimizacion',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      description: 'Contenedorización para mejor rendimiento',
      color: 'from-blue-400 to-blue-600'
    },

    // Seguridad Digital
    {
      name: 'Auth0',
      category: 'seguridad',
      logo: 'https://auth0.com/lib/badge.svg',
      description: 'Autenticación y autorización segura',
      color: 'from-orange-400 to-orange-600'
    },
    {
      name: 'SSL/TLS',
      category: 'seguridad',
      logo: 'https://letsencrypt.org/images/le-logo-wide.svg',
      description: 'Certificados de seguridad',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'AWS Security',
      category: 'seguridad',
      logo: 'https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico',
      description: 'Servicios de seguridad en la nube',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'Penetration Testing',
      category: 'seguridad',
      logo: 'https://www.metasploit.com/includes/images/metasploit-r7-logo.svg',
      description: 'Auditorías de seguridad',
      color: 'from-red-400 to-red-600'
    },

    // Gestión de Equipos
    {
      name: 'Slack',
      category: 'equipos',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg',
      description: 'Comunicación empresarial',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Microsoft Teams',
      category: 'equipos',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg',
      description: 'Colaboración y videoconferencias',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Jira',
      category: 'equipos',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
      description: 'Gestión de proyectos ágiles',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Trello',
      category: 'equipos',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg',
      description: 'Organización visual de tareas',
      color: 'from-blue-400 to-blue-600'
    },

    // Soluciones Móviles
    {
      name: 'React Native',
      category: 'moviles',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      description: 'Desarrollo de apps multiplataforma',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Flutter',
      category: 'moviles',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      description: 'Apps nativas con Flutter',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Progressive Web Apps',
      category: 'moviles',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Progressive_Web_Apps_Logo.svg',
      description: 'Aplicaciones web progresivas',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Firebase',
      category: 'moviles',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      description: 'Backend como servicio para móviles',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const filteredTechnologies = selectedCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

  const displayedTechnologies = showAll 
    ? filteredTechnologies 
    : filteredTechnologies.slice(0, 8);

  const hasMoreTechnologies = filteredTechnologies.length > 8;

  return (
    <section id="tecnologias" className="py-20 bg-blue-100 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 via-gray-800 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
            Nuestras Tecnologías
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Utilizamos las <span className="text-blue-600 font-semibold">mejores herramientas</span> y 
            tecnologías del mercado para entregar soluciones de alta calidad.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-400 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-white/80 text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-sm border border-gray-200'
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {displayedTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-48" // Altura fija para todas las tarjetas
            >
              {/* Card hover effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-blue-800 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              
              <div className="relative bg-white rounded-2xl p-6 border border-gray-200 group-hover:border-transparent transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
                {/* Logo and Title Row */}
                <div className="flex items-center mb-4 flex-shrink-0">
                  <div className="relative mr-4 flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={tech.logo} 
                        alt={tech.name} 
                        className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg items-center justify-center text-white text-lg font-bold">
                        {tech.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 leading-tight">
                    {tech.name}
                  </h3>
                </div>

                {/* Description - Ocupa el espacio restante */}
                <div className="flex-1 flex items-start">
                  <p className="text-gray-600 text-m leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {tech.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More/Less Button */}
        {hasMoreTechnologies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {showAll ? (
                <>
                  <span className="mr-2">Ver Menos</span>
                  <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  <span className="mr-2">Ver Todas las Tecnologías ({filteredTechnologies.length})</span>
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-gray-600">Tecnologías</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">6</div>
            <div className="text-gray-600">Categorías</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Actualizadas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-yellow-600 mb-2">24/7</div>
            <div className="text-gray-600">Soporte</div>
          </div>
        </motion.div>

        {/* AWS Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ingenieros <span className="text-orange-600"> AWS Certificados</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestro equipo cuenta con <span className="font-semibold text-orange-600">hasta 6+ certificaciones AWS </span> 
               que avalan su expertise en la nube.
            </p>
          </div>

          {/* Rotating Certifications */}
          <div className="flex justify-center items-center">
            <div className="relative w-80 h-80">
              {/* Center AWS Logo */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" 
                  alt="AWS" 
                  className="w-24 h-12 object-contain"
                />
              </div>

              {/* Rotating Certification Badges */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                {/* Solutions Architect - 0° (top) */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                  <div className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'normal' }}>
                    <img 
                      src="https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png" 
                      alt="AWS Solutions Architect" 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>

                {/* DevOps Engineer - 60° (top-right) */}
                <div className="absolute top-16 right-6 transform translate-x-2 -translate-y-2">
                  <div className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'normal' }}>
                    <img 
                      src="https://images.credly.com/size/340x340/images/bd31ef42-d460-493e-8503-39592aaf0458/image.png" 
                      alt="AWS DevOps Engineer" 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>

                {/* Developer - 120° (bottom-right) */}
                <div className="absolute bottom-16 right-6 transform translate-x-2 translate-y-2">
                  <div className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'normal' }}>
                    <img 
                      src="https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png" 
                      alt="AWS Developer" 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>

                {/* Cloud Practitioner - 180° (bottom) */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'normal' }}>
                    <img 
                      src="https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png" 
                      alt="AWS Cloud Practitioner" 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>

                {/* SysOps Administrator - 240° (bottom-left) */}
                <div className="absolute bottom-16 left-6 transform -translate-x-2 translate-y-2">
                  <div className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'normal' }}>
                    <img 
                      src="https://images.credly.com/size/340x340/images/f0d3fbb9-bfa7-4017-9989-7bde8eaf42b1/image.png" 
                      alt="AWS SysOps Administrator" 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>

                {/* Security - 300° (top-left) */}
                <div className="absolute top-16 left-6 transform -translate-x-2 -translate-y-2">
                  <div className="animate-spin" style={{ animationDuration: '20s', animationDirection: 'normal' }}>
                    <img 
                      src="https://images.credly.com/size/340x340/images/53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png" 
                      alt="AWS Security Specialty" 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Orbit Ring */}
              <div className="absolute inset-8 border-2 border-dashed border-transparent rounded-full opacity-30"></div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">6+</div>
                <div className="text-sm text-gray-600">Certificaciones</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-600">AWS Certified</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
