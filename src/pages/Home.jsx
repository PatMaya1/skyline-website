import HomeHero from '../components/home/HomeHero';
import HomeServices from '../components/home/HomeServices';
import RightAdvice from '../components/home/RightAdvice';
import Sectors from '../components/home/Sectors';
import ProgressiveSolutions from '../components/home/ProgressiveSolutions';
import Testimonials from '../components/home/Testimonials';
import LatestNews from '../components/home/LatestNews';
import LogoBar from '../components/home/LogoBar';
import HomeFooter from '../components/home/HomeFooter';

export default function Home() {
  return (
    <div className="bg-page min-h-screen">
      <HomeHero />
      <HomeServices />
      <RightAdvice />
      <Sectors />
      <ProgressiveSolutions />
      <Testimonials />
      <LatestNews />
      <LogoBar />
      <HomeFooter />
    </div>
  );
}
