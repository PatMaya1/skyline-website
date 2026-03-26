import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import caseStudies from '../data/caseStudies.json';
import HomeHeader from '../components/home/HomeHeader';
import HomeFooter from '../components/home/HomeFooter';

const caseImages = import.meta.glob('../assets/figma/services/*.jpg', { eager: true });

function getCaseImage(filename) {
  const key = Object.keys(caseImages).find(k => k.endsWith(filename));
  return key ? caseImages[key].default : '';
}

export default function CaseStudyDetail() {
  const { id } = useParams();
  const study = caseStudies.find(s => s.id === id);

  if (!study) {
    return (
      <div className="bg-page min-h-screen">
        <HomeHeader />
        <div className="max-w-[1076px] mx-auto px-4 xl:px-0 py-32 text-center">
          <h1 className="text-navy font-semibold text-3xl mb-4">Caso no encontrado</h1>
          <Link to="/#casos" className="text-accent hover:text-accent-dark transition-colors">
            Volver a casos de éxito
          </Link>
        </div>
        <HomeFooter />
      </div>
    );
  }

  return (
    <div className="bg-page min-h-screen">
      <HomeHeader />

      {/* Hero Image */}
      <div className="w-full h-[300px] md:h-[420px] relative overflow-hidden">
        <img
          src={getCaseImage(study.image)}
          alt={study.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1076px] mx-auto px-4 xl:px-0 w-full pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-accent text-white text-sm font-medium px-3 py-1 inline-block mb-4">
                {study.industry}
              </span>
              <h1 className="text-white font-semibold text-2xl md:text-4xl leading-tight max-w-2xl">
                {study.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1076px] mx-auto px-4 xl:px-0 py-12 md:py-20">
        {/* Back link */}
        <Link
          to="/#casos"
          className="inline-flex items-center gap-2 text-navy/60 hover:text-navy transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a casos de éxito</span>
        </Link>

        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="col-span-12 md:col-span-7">
            {/* Client & Duration */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="text-navy font-medium">{study.client}</span>
              <span className="text-navy/30">|</span>
              <span className="text-navy/50 text-sm">{study.duration}</span>
            </motion.div>

            {/* Challenge */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-navy font-semibold text-xl mb-4">El desafío</h2>
              <p className="text-navy/60 leading-relaxed">{study.challenge}</p>
            </motion.div>

            {/* Solution */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-navy font-semibold text-xl mb-4">Nuestra solución</h2>
              <p className="text-navy/60 leading-relaxed">{study.solution}</p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              className="border-l-4 border-accent pl-6 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <p className="text-navy/70 text-lg italic mb-3">"{study.quote}"</p>
              <cite className="text-navy/40 text-sm font-medium not-italic">— {study.quoteAuthor}</cite>
            </motion.blockquote>
          </div>

          {/* Results Sidebar */}
          <div className="col-span-12 md:col-span-5">
            <motion.div
              className="bg-white p-8 sticky top-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-navy font-semibold text-xl mb-8">Resultados</h2>
              <div className="flex flex-col gap-8">
                {study.results.map((result, j) => (
                  <div key={j} className="flex flex-col gap-2">
                    <span className="text-accent font-bold text-3xl md:text-4xl">
                      {result.metric}
                    </span>
                    <span className="text-navy/50 text-sm leading-tight">
                      {result.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
}
