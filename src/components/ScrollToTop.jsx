import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que automáticamente hace scroll al inicio cuando cambia la ruta
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll al inicio cuando cambia la ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
