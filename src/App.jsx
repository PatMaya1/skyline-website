import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlanesDetalle from './pages/PlanesDetalle';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planes" element={<PlanesDetalle />} />
      </Routes>
    </Router>
  );
}

export default App