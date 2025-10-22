import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Technologies from '../components/Technologies';
import Process from '../components/Process';
import DemosPreview from '../components/DemosPreview';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Technologies />
      <Process />
      <DemosPreview />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
