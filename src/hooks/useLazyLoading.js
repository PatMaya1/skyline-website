import { useState, useRef, useEffect } from 'react';

/**
 * Hook para intersection observer optimizado
 * @param {Object} options - Opciones para el intersection observer
 * @returns {Array} [ref, isIntersecting]
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isIntersecting) {
          setIsIntersecting(true);
          // Desconectar después de la primera intersección para mejor rendimiento
          if (options.once !== false) {
            observer.unobserve(element);
          }
        } else if (!entry.isIntersecting && !options.once) {
          setIsIntersecting(false);
        }
      },
      {
        rootMargin: options.rootMargin || '-50px',
        threshold: options.threshold || 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [isIntersecting, options.once, options.rootMargin, options.threshold]);

  return [ref, isIntersecting];
};

/**
 * Componente para lazy loading de secciones pesadas
 */
export const LazySection = ({ children, className = '', fallback = null, ...props }) => {
  const [ref, isVisible] = useIntersectionObserver({ 
    rootMargin: '100px', // Cargar 100px antes de que sea visible
    once: true 
  });

  return (
    <div ref={ref} className={className} {...props}>
      {isVisible ? children : (fallback || <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />)}
    </div>
  );
};
