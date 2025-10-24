/**
 * Sabores Mexicanos - Script Principal
 * Demo del Plan Catálogo Digital de Skyline
 */

// ========================================
// Configuración y Estado Global
// ========================================
const APP = {
  initialized: false,
  scrolled: false,
  viewedCategories: new Set(),
  analytics: {
    pageViews: 0,
    itemViews: new Set(),
    whatsappClicks: 0,
    menuSectionViews: new Set()
  }
};

// ========================================
// Inicialización
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🍽️ Sabores Mexicanos - Catálogo Digital');
  console.log('📱 Plan Catálogo Digital de Skyline');
  console.log('='.repeat(50));

  initializeApp();
});

function initializeApp() {
  if (APP.initialized) return;

  setupScrollEffects();
  setupNavigationEffects();
  setupMenuItemTracking();
  setupWhatsAppTracking();
  setupIntersectionObserver();
  setupSmoothScroll();
  simulateAnalytics();

  APP.initialized = true;
  console.log('✅ Aplicación inicializada correctamente');
}

// ========================================
// Efectos de Scroll
// ========================================
function setupScrollEffects() {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;

    if (scrolled !== APP.scrolled) {
      APP.scrolled = scrolled;

      if (scrolled) {
        header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
      } else {
        header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
      }
    }
  });

  console.log('✓ Efectos de scroll configurados');
}

// ========================================
// Navegación Suave
// ========================================
function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        console.log(`🔗 Navegación a: ${targetId}`);
      }
    });
  });

  console.log('✓ Scroll suave configurado');
}

// ========================================
// Tracking de Elementos del Menú
// ========================================
function setupMenuItemTracking() {
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      const itemName = item.querySelector('.item-name')?.textContent || `Item ${index + 1}`;

      if (!APP.analytics.itemViews.has(itemName)) {
        APP.analytics.itemViews.add(itemName);
        console.log(`👁️ Usuario vio: ${itemName}`);
      }
    });

    // Efecto de click simulado
    item.addEventListener('click', () => {
      const itemName = item.querySelector('.item-name')?.textContent || 'Platillo';
      console.log(`🍴 Click en: ${itemName}`);
      console.log('💡 En versión real: Abrir modal con detalles o agregar a pedido');
    });
  });

  console.log(`✓ Tracking configurado para ${menuItems.length} items del menú`);
}

// ========================================
// Tracking de WhatsApp
// ========================================
function setupWhatsAppTracking() {
  const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

  whatsappButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      APP.analytics.whatsappClicks++;

      const buttonText = button.textContent.trim();
      console.log(`📱 Click en WhatsApp: "${buttonText}"`);
      console.log(`📊 Total de clicks en WhatsApp: ${APP.analytics.whatsappClicks}`);
      console.log('🔗 Abriendo WhatsApp con mensaje predefinido...');

      // Simular envío de evento a analytics
      trackEvent('whatsapp_click', {
        button_location: button.classList.contains('floating-whatsapp') ? 'floating' : 'cta_section',
        timestamp: new Date().toISOString()
      });
    });
  });

  console.log(`✓ Tracking de WhatsApp configurado (${whatsappButtons.length} botones)`);
}

// ========================================
// Intersection Observer para Animaciones
// ========================================
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        entry.target.style.opacity = '1';

        // Tracking de secciones vistas
        if (entry.target.classList.contains('menu-category')) {
          const categoryName = entry.target.querySelector('.category-title')?.textContent.trim();
          if (categoryName && !APP.analytics.menuSectionViews.has(categoryName)) {
            APP.analytics.menuSectionViews.add(categoryName);
            console.log(`📂 Usuario vio categoría: ${categoryName}`);
          }
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar categorías de menú y secciones
  document.querySelectorAll('.menu-category, .info-card, .menu-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  console.log('✓ Intersection Observer configurado');
}

// ========================================
// Efectos de Navegación
// ========================================
function setupNavigationEffects() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });
}

// ========================================
// Simulación de Analytics
// ========================================
function simulateAnalytics() {
  APP.analytics.pageViews++;

  console.log('\n📊 ANALYTICS SIMULADOS');
  console.log('='.repeat(50));
  console.log(`Vistas de página: ${APP.analytics.pageViews}`);
  console.log('Este catálogo digital incluye:');
  console.log('  ✓ Seguimiento de visualizaciones de items');
  console.log('  ✓ Tracking de clicks en WhatsApp');
  console.log('  ✓ Análisis de categorías más vistas');
  console.log('  ✓ Optimización para Google (SEO)');
  console.log('='.repeat(50));

  // Simular actualización periódica de stats
  setInterval(() => {
    displayAnalyticsSummary();
  }, 30000); // Cada 30 segundos
}

function displayAnalyticsSummary() {
  console.log('\n📈 Resumen de Actividad:');
  console.log(`  • Items vistos: ${APP.analytics.itemViews.size}`);
  console.log(`  • Categorías exploradas: ${APP.analytics.menuSectionViews.size}`);
  console.log(`  • Clicks en WhatsApp: ${APP.analytics.whatsappClicks}`);
}

// ========================================
// Tracking de Eventos (Simulación)
// ========================================
function trackEvent(eventName, eventData = {}) {
  console.log(`\n🎯 Evento: ${eventName}`);
  console.log('Datos:', eventData);

  // En producción, aquí se enviaría a Google Analytics, Meta Pixel, etc.
  if (window.gtag) {
    // gtag('event', eventName, eventData);
    console.log('  → Enviado a Google Analytics (simulado)');
  }

  if (window.fbq) {
    // fbq('track', eventName, eventData);
    console.log('  → Enviado a Meta Pixel (simulado)');
  }
}

// ========================================
// Detección de QR Scan (Simulación)
// ========================================
function checkIfQRScan() {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('qr') || urlParams.has('table')) {
    const tableNumber = urlParams.get('table') || 'desconocida';

    console.log(`\n🔍 QR ESCANEADO`);
    console.log(`Mesa: ${tableNumber}`);
    console.log('💡 En versión real: Mostrar mensaje de bienvenida personalizado');

    trackEvent('qr_scan', {
      table: tableNumber,
      timestamp: new Date().toISOString()
    });

    // Mostrar mensaje de bienvenida (simulado)
    setTimeout(() => {
      console.log('👋 "¡Bienvenido! Explora nuestro menú y pide directamente desde tu mesa"');
    }, 1000);
  }
}

// Verificar si vino desde QR
checkIfQRScan();

// ========================================
// Simulación de Actualizaciones en Tiempo Real
// ========================================
function simulateRealtimeUpdates() {
  console.log('\n🔄 ACTUALIZACIONES EN TIEMPO REAL');
  console.log('='.repeat(50));
  console.log('Este catálogo se puede actualizar fácilmente:');
  console.log('  • Cambiar precios sin ayuda técnica');
  console.log('  • Agregar/quitar platillos');
  console.log('  • Actualizar descripciones');
  console.log('  • Modificar disponibilidad');
  console.log('  • Agregar promociones especiales');
  console.log('='.repeat(50));
}

simulateRealtimeUpdates();

// ========================================
// Detección de Dispositivo
// ========================================
function detectDevice() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;

  console.log('\n📱 INFORMACIÓN DEL DISPOSITIVO');
  console.log('='.repeat(50));
  console.log(`Tipo: ${isMobile ? (isTablet ? 'Tablet' : 'Móvil') : 'Escritorio'}`);
  console.log(`Ancho de pantalla: ${window.innerWidth}px`);
  console.log(`Alto de pantalla: ${window.innerHeight}px`);
  console.log('✓ Diseño optimizado para todos los dispositivos');
  console.log('='.repeat(50));

  return { isMobile, isTablet };
}

const deviceInfo = detectDevice();

// ========================================
// Funcionalidad de Búsqueda (Demo)
// ========================================
function simulateSearchFeature() {
  console.log('\n🔍 FUNCIÓN DE BÚSQUEDA (Disponible en versión premium)');
  console.log('Los clientes podrían buscar:');
  console.log('  • "vegetariano" → Mostrar solo platillos vegetarianos');
  console.log('  • "tacos" → Filtrar solo tacos');
  console.log('  • "menos de 100" → Filtrar por precio');
}

// Simular búsqueda cada 45 segundos
setTimeout(simulateSearchFeature, 45000);

// ========================================
// Performance Monitoring
// ========================================
function monitorPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];

        console.log('\n⚡ MÉTRICAS DE RENDIMIENTO');
        console.log('='.repeat(50));
        console.log(`Tiempo de carga: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        console.log(`DOM listo: ${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms`);
        console.log('✓ Sitio optimizado para carga rápida');
        console.log('='.repeat(50));
      }, 0);
    });
  }
}

monitorPerformance();

// ========================================
// Mensajes de Consola Informativos
// ========================================
console.log('\n💡 CARACTERÍSTICAS DEL PLAN CATÁLOGO DIGITAL');
console.log('='.repeat(50));
console.log('✓ Menú digital completo con fotos y precios');
console.log('✓ Código QR personalizado para mesas');
console.log('✓ Botón directo a WhatsApp para pedidos');
console.log('✓ Actualizable fácilmente sin ayuda técnica');
console.log('✓ Optimizado para Google y búsquedas');
console.log('✓ Diseño responsive (móvil, tablet, escritorio)');
console.log('✓ Versión lista para integrar en sitio web');
console.log('='.repeat(50));

console.log('\n🎨 Este es un sitio demo del Plan Catálogo Digital');
console.log('💼 Creado por Skyline - Soluciones Digitales');
console.log('📞 ¿Interesado? Visita la página principal para contactarnos\n');

// ========================================
// Export para uso externo
// ========================================
window.CatalogoDigital = {
  analytics: APP.analytics,
  trackEvent,
  version: '1.0.0'
};
