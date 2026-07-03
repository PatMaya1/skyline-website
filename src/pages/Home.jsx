import HomeHero from '../components/home/HomeHero';
import CompanyLogos from '../components/home/CompanyLogos';
import HomeServices from '../components/home/HomeServices';
import RightAdvice from '../components/home/RightAdvice';
import ManagedServices from '../components/home/ManagedServices';
import Methodology from '../components/home/Methodology';
import CaseStudies from '../components/home/CaseStudies';
import Projects from '../components/home/Projects';
import Technologies from '../components/home/Technologies';
import HomeContact from '../components/home/HomeContact';
import HomeFooter from '../components/home/HomeFooter';
import Seo from '../components/Seo';
import { SITE_URL, ORG_ID } from '../seo/siteConfig';

const servicesCatalogLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Áreas de consultoría de Skyline IT',
  itemListElement: [
    'Estrategia de Transformación Digital',
    'Inteligencia de Datos y Business Intelligence',
    'Optimización de Operaciones',
    'Adopción de Inteligencia Artificial',
    'Arquitectura y Seguridad en la Nube',
    'Gobierno de TI y Gestión del Cambio',
  ].map((name, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name,
      provider: { '@id': ORG_ID },
      areaServed: ['MX', 'US'],
    },
  })),
};

const homeWebPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: 'Skyline IT | Consultoría Tecnológica Estratégica',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': ORG_ID },
  inLanguage: 'es-MX',
};

export default function Home() {
  return (
    <div className="bg-page min-h-screen">
      <Seo
        title="Skyline IT"
        description="Consultoría IT para empresas medianas en México y EE.UU.: transformación digital, datos, IA, nube y optimización de operaciones. Diagnóstico gratuito."
        path="/"
        jsonLd={[homeWebPageLd, servicesCatalogLd]}
      />
      <HomeHero />
      <CompanyLogos />
      <HomeServices />
      <RightAdvice />
      <ManagedServices />
      <Methodology />
      <CaseStudies />
      <Projects />
      <Technologies />
      <HomeContact />
      <HomeFooter />
    </div>
  );
}
