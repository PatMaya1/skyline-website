import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudyDetail from './pages/CaseStudyDetail';
import SneakerRepairCase from './pages/SneakerRepairCase';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/casos/sneaker-repair" element={<SneakerRepairCase />} />
        <Route path="/casos/:id" element={<CaseStudyDetail />} />
      </Routes>
    </Router>
  );
}

export default App
