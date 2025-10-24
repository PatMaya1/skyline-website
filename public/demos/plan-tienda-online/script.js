/**
 * Estilo Urbano - Script Principal
 * Demo del Plan Tienda en Línea de Skyline
 */

// ========================================
// Estado Global
// ========================================
const APP = {
  cart: [],
  currentFilter: 'all',
  analytics: {
    pageViews: 0,
    productViews: new Set(),
    addToCartClicks: 0,
    checkoutAttempts: 0,
    totalRevenue: 0
  }
};

// ========================================
// Inicialización
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🛍️ Estilo Urbano - Tienda en Línea');
  console.log('💼 Plan Tienda en Línea de Skyline');
  console.log('='.repeat(60));

  initializeApp();
});

function initializeApp() {
  setupShoppingCart();
  setupProductFilters();
  setupProductCards();
  setupNewsletter();
  setupScrollEffects();
  loadCartFromStorage();
  simulateAnalytics();

  console.log('✅ E-commerce inicializado correctamente');
  displayFeatures();
}

// ========================================
// Carrito de Compras
// ========================================
function setupShoppingCart() {
  const cartBtn = document.querySelector('.cart-btn');
  const closeCart = document.getElementById('closeCart');
  const overlay = document.getElementById('overlay');
  const cartSidebar = document.getElementById('cartSidebar');
  const continueShopping = document.getElementById('continueShopping');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Abrir carrito
  cartBtn?.addEventListener('click', () => {
    openCart();
  });

  // Cerrar carrito
  closeCart?.addEventListener('click', () => {
    closeCartSidebar();
  });

  continueShopping?.addEventListener('click', () => {
    closeCartSidebar();
  });

  overlay?.addEventListener('click', () => {
    closeCartSidebar();
  });

  // Checkout
  checkoutBtn?.addEventListener('click', () => {
    processCheckout();
  });

  console.log('✓ Sistema de carrito configurado');
}

function openCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('overlay');

  cartSidebar.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  console.log('🛒 Carrito abierto');
}

function closeCartSidebar() {
  const cartSidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('overlay');

  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';

  console.log('🛒 Carrito cerrado');
}

function addToCart(productName, price) {
  const existingItem = APP.cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    APP.cart.push({
      name: productName,
      price: parseFloat(price),
      quantity: 1
    });
  }

  updateCartUI();
  saveCartToStorage();

  // Analytics
  APP.analytics.addToCartClicks++;

  console.log(`✅ Agregado al carrito: ${productName} - $${price}`);
  console.log(`📊 Items en carrito: ${APP.cart.length}`);

  // Mostrar notificación visual
  showNotification(`${productName} agregado al carrito`);

  // Tracking
  trackEvent('add_to_cart', {
    product_name: productName,
    price: price,
    timestamp: new Date().toISOString()
  });
}

function removeFromCart(productName) {
  const index = APP.cart.findIndex(item => item.name === productName);

  if (index > -1) {
    APP.cart.splice(index, 1);
    updateCartUI();
    saveCartToStorage();

    console.log(`🗑️ Eliminado del carrito: ${productName}`);
  }
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  // Actualizar contador
  const totalItems = APP.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Actualizar items
  if (APP.cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <p>Tu carrito está vacío</p>
        <span>🛒</span>
      </div>
    `;
  } else {
    cartItems.innerHTML = APP.cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image" style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);">
          🛍️
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toLocaleString()}</div>
          <div>Cantidad: ${item.quantity}</div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">
            Eliminar
          </button>
        </div>
      </div>
    `).join('');
  }

  // Actualizar total
  const total = APP.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `$${total.toLocaleString()}`;
}

function saveCartToStorage() {
  try {
    localStorage.setItem('estilourbano_cart', JSON.stringify(APP.cart));
  } catch (e) {
    console.warn('No se pudo guardar el carrito en localStorage');
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('estilourbano_cart');
    if (saved) {
      APP.cart = JSON.parse(saved);
      updateCartUI();
      console.log('✓ Carrito cargado desde almacenamiento local');
    }
  } catch (e) {
    console.warn('No se pudo cargar el carrito desde localStorage');
  }
}

function processCheckout() {
  if (APP.cart.length === 0) {
    showNotification('Tu carrito está vacío', 'warning');
    return;
  }

  const total = APP.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  console.log('\n💳 PROCESANDO CHECKOUT');
  console.log('='.repeat(60));
  console.log(`Items: ${APP.cart.length}`);
  console.log(`Total: $${total.toLocaleString()} MXN`);
  console.log('\n📦 Items en el pedido:');

  APP.cart.forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`);
  });

  console.log('\n💡 En versión real:');
  console.log('  1. Selección de método de pago (Stripe, MercadoPago, Transferencia, Oxxo)');
  console.log('  2. Captura de dirección de envío');
  console.log('  3. Confirmación de pedido');
  console.log('  4. Procesamiento de pago seguro');
  console.log('  5. Notificación por correo y WhatsApp');
  console.log('  6. Panel de administración actualizado');
  console.log('='.repeat(60));

  // Simular checkout exitoso
  setTimeout(() => {
    showNotification('✅ Pedido procesado exitosamente (DEMO)', 'success');

    // Analytics
    APP.analytics.checkoutAttempts++;
    APP.analytics.totalRevenue += total;

    // Tracking
    trackEvent('purchase', {
      transaction_id: `TX-${Date.now()}`,
      value: total,
      items: APP.cart.length,
      currency: 'MXN'
    });

    // Limpiar carrito
    APP.cart = [];
    updateCartUI();
    saveCartToStorage();
    closeCartSidebar();

    console.log('✅ Checkout completado (simulado)');
  }, 1500);
}

// ========================================
// Filtros de Productos
// ========================================
function setupProductFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Actualizar botones activos
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filtrar productos
      productCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
          card.style.display = 'none';
        }
      });

      APP.currentFilter = filter;
      console.log(`🔍 Filtro aplicado: ${filter}`);

      trackEvent('filter_products', { filter });
    });
  });

  console.log('✓ Filtros de productos configurados');
}

// ========================================
// Tarjetas de Productos
// ========================================
function setupProductCards() {
  const addToCartButtons = document.querySelectorAll('.btn-add-cart');

  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const productName = btn.getAttribute('data-product');
      const price = btn.getAttribute('data-price');

      addToCart(productName, price);

      // Animación del botón
      btn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  });

  // Quick View buttons
  const quickViewButtons = document.querySelectorAll('.quick-view-btn');
  quickViewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const productCard = btn.closest('.product-card');
      const productName = productCard.querySelector('.product-name')?.textContent;

      console.log(`👁️ Vista rápida: ${productName}`);
      console.log('💡 En versión real: Abrir modal con detalles, galería de fotos, tallas disponibles, etc.');

      showNotification('Vista rápida de producto (DEMO)');

      trackEvent('quick_view', { product_name: productName });
    });
  });

  // Tracking de vistas de productos
  const productCards = document.querySelectorAll('.product-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const productName = entry.target.querySelector('.product-name')?.textContent;
        if (productName && !APP.analytics.productViews.has(productName)) {
          APP.analytics.productViews.add(productName);
          console.log(`📦 Producto visto: ${productName}`);
        }
      }
    });
  }, { threshold: 0.5 });

  productCards.forEach(card => observer.observe(card));

  console.log(`✓ ${addToCartButtons.length} productos configurados`);
}

// ========================================
// Newsletter
// ========================================
function setupNewsletter() {
  const form = document.getElementById('newsletterForm');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value;

    console.log('\n📧 SUSCRIPCIÓN AL NEWSLETTER');
    console.log('='.repeat(60));
    console.log(`Email: ${email}`);
    console.log('\n💡 En versión real:');
    console.log('  1. Validación de email');
    console.log('  2. Integración con servicio de email marketing (MailChimp, SendGrid)');
    console.log('  3. Envío de email de bienvenida con cupón de 10% OFF');
    console.log('  4. Agregar a lista de contactos');
    console.log('='.repeat(60));

    showNotification('¡Gracias por suscribirte! Recibirás un cupón de 10% OFF (DEMO)', 'success');

    trackEvent('newsletter_signup', { email });

    form.reset();
  });

  console.log('✓ Newsletter configurado');
}

// ========================================
// Efectos de Scroll
// ========================================
function setupScrollEffects() {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
      header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  console.log('✓ Efectos de scroll configurados');
}

// ========================================
// Notificaciones
// ========================================
function showNotification(message, type = 'info') {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  // Estilos
  Object.assign(notification.style, {
    position: 'fixed',
    top: '100px',
    right: '20px',
    padding: '1rem 1.5rem',
    background: type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#8b5cf6',
    color: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    zIndex: '1000',
    animation: 'slideInRight 0.3s ease-out',
    fontWeight: '600',
    fontSize: '0.9375rem'
  });

  document.body.appendChild(notification);

  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// Analytics y Tracking
// ========================================
function simulateAnalytics() {
  APP.analytics.pageViews++;

  console.log('\n📊 ANALYTICS DE E-COMMERCE');
  console.log('='.repeat(60));
  console.log('Este plan incluye:');
  console.log('  ✓ Google Analytics 4 para e-commerce');
  console.log('  ✓ Meta Pixel para retargeting');
  console.log('  ✓ Tracking de productos vistos');
  console.log('  ✓ Abandono de carrito');
  console.log('  ✓ Conversiones y ventas');
  console.log('  ✓ Tráfico y comportamiento');
  console.log('  ✓ Dashboard de ventas en tiempo real');
  console.log('='.repeat(60));

  // Simular actualización de stats cada 30 segundos
  setInterval(() => {
    displayAnalyticsSummary();
  }, 30000);
}

function displayAnalyticsSummary() {
  console.log('\n📈 Resumen de Actividad:');
  console.log(`  • Productos vistos: ${APP.analytics.productViews.size}`);
  console.log(`  • Agregados al carrito: ${APP.analytics.addToCartClicks}`);
  console.log(`  • Checkouts completados: ${APP.analytics.checkoutAttempts}`);
  console.log(`  • Ingresos generados: $${APP.analytics.totalRevenue.toLocaleString()} MXN (DEMO)`);
}

function trackEvent(eventName, eventData = {}) {
  console.log(`\n🎯 Evento: ${eventName}`);

  if (Object.keys(eventData).length > 0) {
    console.log('Datos:', eventData);
  }

  // Simular envío a plataformas de analytics
  if (window.gtag) {
    console.log('  → Google Analytics (simulado)');
  }

  if (window.fbq) {
    console.log('  → Meta Pixel (simulado)');
  }
}

// ========================================
// Funcionalidades Destacadas
// ========================================
function displayFeatures() {
  console.log('\n💡 CARACTERÍSTICAS DEL PLAN TIENDA EN LÍNEA');
  console.log('='.repeat(60));
  console.log('✓ Tienda en línea completa con carrito de compras');
  console.log('✓ Pasarelas de pago seguras (Stripe, MercadoPago)');
  console.log('✓ Gestión de inventario y pedidos');
  console.log('✓ Notificaciones automáticas por email y WhatsApp');
  console.log('✓ Pagos con tarjeta, transferencia u Oxxo');
  console.log('✓ Integración con servicios de envío');
  console.log('✓ Dashboard de ventas y reportes');
  console.log('✓ SEO optimizado para productos');
  console.log('✓ Sistema de reseñas y calificaciones');
  console.log('✓ Cupones y descuentos');
  console.log('✓ Recuperación de carritos abandonados');
  console.log('✓ Mobile-first y completamente responsive');
  console.log('='.repeat(60));
}

// ========================================
// Simulación de Sistemas de Pago
// ========================================
function demonstratePaymentIntegration() {
  console.log('\n💳 INTEGRACIÓN DE PAGOS');
  console.log('='.repeat(60));
  console.log('Métodos de pago disponibles:');
  console.log('\n1. STRIPE');
  console.log('   • Tarjetas de crédito/débito');
  console.log('   • Apple Pay / Google Pay');
  console.log('   • Comisión: ~3.6% + $3 MXN');
  console.log('\n2. MERCADOPAGO');
  console.log('   • Tarjetas (hasta 12 MSI)');
  console.log('   • Transferencias');
  console.log('   • Pago en Oxxo');
  console.log('   • Comisión: ~3.99% + IVA');
  console.log('\n3. TRANSFERENCIA DIRECTA');
  console.log('   • CLABE interbancaria');
  console.log('   • Sin comisiones adicionales');
  console.log('='.repeat(60));
}

// Mostrar info de pagos después de 20 segundos
setTimeout(demonstratePaymentIntegration, 20000);

// ========================================
// Simulación de Notificaciones
// ========================================
function demonstrateNotifications() {
  console.log('\n📧 SISTEMA DE NOTIFICACIONES');
  console.log('='.repeat(60));
  console.log('Notificaciones automáticas:');
  console.log('\n📬 Al cliente:');
  console.log('  1. Confirmación de pedido (email + WhatsApp)');
  console.log('  2. Actualización de estado de envío');
  console.log('  3. Confirmación de entrega');
  console.log('  4. Solicitud de reseña');
  console.log('\n📥 Al administrador:');
  console.log('  1. Nuevo pedido recibido');
  console.log('  2. Alerta de stock bajo');
  console.log('  3. Resumen diario de ventas');
  console.log('  4. Carrito abandonado (para seguimiento)');
  console.log('='.repeat(60));
}

// Mostrar info de notificaciones después de 40 segundos
setTimeout(demonstrateNotifications, 40000);

// ========================================
// Detección de Dispositivo y Performance
// ========================================
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
console.log(`\n📱 Dispositivo: ${isMobile ? 'Móvil' : 'Escritorio'}`);
console.log(`📐 Pantalla: ${window.innerWidth}x${window.innerHeight}px`);

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('\n⚡ RENDIMIENTO');
      console.log(`Carga total: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
      console.log('✓ Optimizado para Core Web Vitals');
    }, 0);
  });
}

// ========================================
// Export para debugging
// ========================================
window.EstiloUrbano = {
  cart: APP.cart,
  analytics: APP.analytics,
  addToCart,
  removeFromCart,
  trackEvent,
  version: '1.0.0'
};

console.log('\n🎨 Este es un sitio demo del Plan Tienda en Línea');
console.log('💼 Creado por Skyline - Soluciones Digitales');
console.log('📞 Visita la página principal para más información\n');
