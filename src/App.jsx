import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudyDetail from './pages/CaseStudyDetail';
import SneakerRepairCase from './pages/SneakerRepairCase';
import DirectSteelCase from './pages/DirectSteelCase';
import Plans from './pages/Plans';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/casos/sneaker-repair" element={<SneakerRepairCase />} />
        <Route path="/casos/direct-steel" element={<DirectSteelCase />} />
        <Route path="/casos/:id" element={<CaseStudyDetail />} />
        <Route path="/planes" element={<Plans />} />
      </Routes>
    </Router>
  );
}

export default App
