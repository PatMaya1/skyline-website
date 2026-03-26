import HomeHero from '../components/home/HomeHero';
import CompanyLogos from '../components/home/CompanyLogos';
import HomeServices from '../components/home/HomeServices';
import RightAdvice from '../components/home/RightAdvice';
import Methodology from '../components/home/Methodology';
import CaseStudies from '../components/home/CaseStudies';
import Testimonials from '../components/home/Testimonials';
import LatestNews from '../components/home/LatestNews';
import HomeContact from '../components/home/HomeContact';
import HomeFooter from '../components/home/HomeFooter';

export default function Home() {
  return (
    <div className="bg-page min-h-screen">
      <HomeHero />
      <CompanyLogos />
      <HomeServices />
      <RightAdvice />
      <Methodology />
      <CaseStudies />
      {/* <Testimonials /> */}
      {/* <LatestNews /> */}
      <HomeContact />
      <HomeFooter />
    </div>
  );
}
