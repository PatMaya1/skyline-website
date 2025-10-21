import { useState, useCallback } from 'react';

/**
 * Componente de imagen optimizada con lazy loading y fallback
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackText = null,
  loading = 'lazy',
  onError: customOnError,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback((e) => {
    setImageError(true);
    setIsLoading(false);
    if (customOnError) {
      customOnError(e);
    }
  }, [customOnError]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (imageError) {
    return (
      <div className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold ${className}`}>
        {fallbackText || alt?.charAt(0) || '?'}
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
};

export default OptimizedImage;
