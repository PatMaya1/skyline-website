import { useMemo } from 'react';

/**
 * Hook para optimizar animaciones reduciendo re-renders innecesarios
 * @param {number} index - Índice del elemento
 * @param {number} maxDelay - Delay máximo permitido
 * @param {number} baseDelay - Delay base por elemento
 * @returns {Object} Configuración de animación optimizada
 */
export const useOptimizedAnimation = (index = 0, maxDelay = 0.3, baseDelay = 0.05) => {
  const animationConfig = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.3,
      delay: Math.min(index * baseDelay, maxDelay),
      ease: "easeOut"
    }
  }), [index, maxDelay, baseDelay]);

  return animationConfig;
};

/**
 * Hook para configuraciones de hover optimizadas
 * @param {boolean} enabled - Si las animaciones están habilitadas
 * @returns {Object} Configuración de hover optimizada
 */
export const useOptimizedHover = (enabled = true) => {
  const hoverConfig = useMemo(() => {
    if (!enabled) return {};
    
    return {
      whileHover: { scale: 1.02, transition: { duration: 0.2 } },
      whileTap: { scale: 0.98, transition: { duration: 0.1 } }
    };
  }, [enabled]);

  return hoverConfig;
};

/**
 * Hook para animaciones de entrada con viewport optimizadas
 * @param {number} delay - Delay de la animación
 * @returns {Object} Configuración de viewport optimizada
 */
export const useOptimizedViewport = (delay = 0) => {
  const viewportConfig = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" }, // Solo anima una vez y con margen optimizado
    transition: { 
      duration: 0.5, 
      delay: Math.min(delay, 0.8),
      ease: "easeOut"
    }
  }), [delay]);

  return viewportConfig;
};
