import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import projects from '../../data/projects.json';

// Los screenshots viven en src/assets/projects/<image>.webp
const projectImages = import.meta.glob('../../assets/projects/*.webp', {
  eager: true,
  import: 'default',
});

function imageFor(name) {
  const match = Object.entries(projectImages).find(([path]) =>
    path.endsWith(`/${name}.webp`)
  );
  return match ? match[1] : undefined;
}

export default function Projects() {
  return (
    <section id="proyectos" className="py-16 md:py-[120px] bg-white">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-5 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-navy/60 text-base uppercase">Proyectos</p>
          <h2 className="text-navy font-semibold text-3xl md:text-[40px] leading-tight">
            Más soluciones que hemos construido
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-12 sm:col-span-6 lg:col-span-4 group flex flex-col bg-page hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Screenshot */}
              <div className="h-[200px] md:h-[220px] w-full relative overflow-hidden">
                <img
                  src={imageFor(project.image)}
                  alt={`Sitio web de ${project.name} desarrollado por Skyline IT`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-navy/90 text-white text-xs font-medium px-3 py-1">
                  {project.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-3 p-6 flex-1">
                <h3 className="text-navy font-semibold text-lg leading-snug">
                  {project.name}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>
                <span className="flex items-center gap-1.5 text-accent text-sm font-medium mt-1">
                  Visitar sitio
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
