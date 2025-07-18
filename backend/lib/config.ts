// Configuraciones específicas del proyecto Skyline
export const SKYLINE_CONFIG = {
  // Configuración del bucket S3
  bucketName: 'skyline-website',
  
  // Configuración de CloudFront
  cloudFront: {
    comment: 'Skyline Website - Consultoría Tecnológica',
    priceClass: 'PriceClass_100', // Solo US y Europa (más económico)
    enableCompression: true,
    enableIPv6: false,
  },
  
  // Configuración de cache
  cache: {
    defaultTtl: 86400, // 24 horas
    maxTtl: 31536000, // 1 año
    minTtl: 0,
  },
  
  // Archivos que no deben ser cacheados
  noCacheFiles: [
    '/index.html',
    '/service-worker.js',
    '/manifest.json',
  ],
  
  // Archivos que deben ser cacheados por mucho tiempo
  longCacheFiles: [
    '/assets/*',
    '*.js',
    '*.css',
    '*.woff2',
    '*.woff',
    '*.ttf',
  ],
  
  // Configuración de seguridad
  security: {
    blockPublicRead: true,
    enforceSSL: true,
    enableHSTS: true,
  },
  
  // Configuración de dominio
  domain: {
    domainName: 'skylineit.mx',
    subdomain: 'www.skylineit.mx',
    createHostedZone: true, // Se creará automáticamente si no existe
  },
  
  // Tags para recursos AWS
  tags: {
    Project: 'Skyline-Website',
    Environment: 'Production',
    Owner: 'Skyline-Team',
    CostCenter: 'Marketing',
  },
};
