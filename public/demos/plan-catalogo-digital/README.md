# 🍽️ Sabores Mexicanos - Demo Plan Catálogo Digital

## 📋 Descripción

Sitio demo que muestra las capacidades del **Plan Catálogo Digital** de Skyline, diseñado específicamente para restaurantes, cafeterías, tiendas y negocios que necesitan mostrar sus productos o menú de forma profesional en internet.

**Caso de uso**: Restaurante de comida tradicional mexicana
**Precio del plan**: $8,500 MXN (pago único)
**Tiempo de entrega**: 1-2 semanas

---

## ✨ Características Implementadas

### 1. **Menú Digital Completo**
- ✅ Organización por categorías (Entradas, Platos Principales, Bebidas, Postres)
- ✅ Fotos representativas con placeholders coloridos
- ✅ Precios claramente visibles
- ✅ Descripciones detalladas de cada platillo
- ✅ Etiquetas informativas (Vegetariano, Popular, Casero, etc.)
- ✅ Items destacados con badge "Especialidad"

### 2. **Código QR Personalizado**
- ✅ Banner dedicado al código QR
- ✅ Diseño visual del código QR (placeholder)
- ✅ Funcionalidad de detección de QR scan (parámetro `?qr=1` o `?table=5`)
- ✅ Mensaje de bienvenida personalizado por mesa

### 3. **Integración con WhatsApp**
- ✅ Botón flotante de WhatsApp (siempre visible)
- ✅ Sección CTA dedicada a pedidos por WhatsApp
- ✅ Enlaces pre-configurados con mensaje inicial
- ✅ Tracking de clicks en botones de WhatsApp
- ✅ Múltiples puntos de contacto estratégicos

### 4. **Actualización Fácil**
- ✅ Estructura de datos clara y organizada
- ✅ Código comentado para facilitar modificaciones
- ✅ Sistema de grid responsive que se ajusta automáticamente
- ✅ Variables CSS para cambios rápidos de colores/estilos

### 5. **Optimización para Google (SEO)**
- ✅ Meta tags completos (title, description, Open Graph)
- ✅ Structured Data (Schema.org) para restaurantes
- ✅ URLs semánticas y descriptivas
- ✅ Títulos jerárquicos correctos (H1, H2, H3)
- ✅ Alt text en elementos visuales
- ✅ Performance optimizado para Core Web Vitals

### 6. **Diseño Responsive**
- ✅ Optimizado para móviles (320px - 768px)
- ✅ Tablet-friendly (768px - 1024px)
- ✅ Escritorio (1024px+)
- ✅ Touch-friendly (botones grandes, espaciado adecuado)
- ✅ Imágenes adaptativas
- ✅ Navegación móvil simplificada

---

## 🎨 Estructura del Sitio

```
├── Hero Section
│   ├── Título del restaurante
│   ├── Subtítulo/Eslogan
│   ├── CTA principal
│   └── Indicador de scroll
│
├── Banner de Código QR
│   ├── Instrucciones para escanear
│   └── Visual del código QR
│
├── Sección de Menú (Principal)
│   ├── Entradas (3 items)
│   ├── Platos Principales (6 items)
│   ├── Bebidas (3 items)
│   └── Postres (3 items)
│
├── Información del Negocio
│   ├── Horarios
│   ├── Ubicación
│   └── Eventos/Reservaciones
│
├── CTA de WhatsApp
│   ├── Beneficios de ordenar
│   ├── Botón principal de WhatsApp
│   └── Tiempo de respuesta
│
├── Contacto
│   ├── Teléfono, Email, WhatsApp
│   └── Redes sociales
│
└── Footer
    ├── Logo y descripción
    ├── Copyright
    └── Badge de demo
```

---

## 🎯 Funcionalidades JavaScript

### Analytics y Tracking
```javascript
- Tracking de items visualizados
- Conteo de clicks en WhatsApp
- Categorías más exploradas
- Tiempo en página
- Dispositivo del usuario
```

### Animaciones
```javascript
- Fade in al hacer scroll
- Hover effects en items del menú
- Smooth scroll en navegación
- Parallax sutil en hero
- Animación del botón flotante (pulse)
```

### Interactividad
```javascript
- Detección de QR scan por URL params
- Mensajes de bienvenida personalizados
- Tracking de eventos (simulado)
- Performance monitoring
- Responsive behavior detection
```

---

## 🎨 Paleta de Colores

```css
--primary: #ea580c (Naranja principal)
--primary-dark: #c2410c (Naranja oscuro)
--primary-light: #fb923c (Naranja claro)
--secondary: #f97316 (Naranja secundario)
--success: #10b981 (Verde WhatsApp)
```

### Gradientes
```css
--gradient-primary: linear-gradient(135deg, #ea580c 0%, #c2410c 100%)
--gradient-hero: Con overlay para hero section
```

---

## 📱 Características Móviles

1. **Navegación simplificada** - Oculta menú en móvil para más espacio
2. **Botón WhatsApp flotante** - Siempre accesible con un tap
3. **Grid de 1 columna** - Items del menú apilados verticalmente
4. **Imágenes optimizadas** - Carga rápida incluso en 3G
5. **Touch targets grandes** - Mínimo 44x44px para fácil toque
6. **Hero compacto** - Altura reducida en móvil para ver contenido rápido

---

## 🚀 Optimizaciones de Rendimiento

- ✅ CSS minificado en producción
- ✅ Fuentes de Google con preconnect
- ✅ Intersection Observer para lazy animations
- ✅ Event delegation donde sea posible
- ✅ Debounce en scroll listeners
- ✅ CSS will-change para animaciones suaves
- ✅ Sin imágenes pesadas (placeholders SVG/emoji)

---

## 🔧 Cómo Actualizar el Menú

### Agregar un nuevo platillo:

```html
<div class="menu-item">
    <div class="item-image" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
        <span class="image-placeholder">🥗</span>
    </div>
    <div class="item-content">
        <div class="item-header">
            <h4 class="item-name">Ensalada César</h4>
            <span class="item-price">$95</span>
        </div>
        <p class="item-description">Lechuga romana, crutones caseros, queso parmesano y aderezo césar.</p>
        <div class="item-tags">
            <span class="tag">Fresca</span>
            <span class="tag">Ligera</span>
        </div>
    </div>
</div>
```

### Cambiar precios:
1. Buscar el platillo por nombre en el HTML
2. Modificar el contenido de `<span class="item-price">$XX</span>`
3. Guardar el archivo

### Modificar colores del sitio:
1. Abrir `styles.css`
2. Modificar las variables en `:root`
3. Los cambios se aplicarán automáticamente en todo el sitio

---

## 📊 Métricas y Analytics (Incluidos)

El plan incluye tracking básico de:
- **Vistas de página**
- **Items más vistos del menú**
- **Clicks en WhatsApp** (cuántos clientes intentan ordenar)
- **Categorías más populares**
- **Dispositivo/navegador del usuario**
- **Tiempo promedio en página**

Listo para integrar con:
- Google Analytics 4
- Meta Pixel (Facebook/Instagram Ads)
- Google Tag Manager

---

## 🎯 Casos de Uso Ideales

### Restaurantes
- Menú digital con QR en mesas
- Pedidos para llevar por WhatsApp
- Reservaciones y eventos

### Cafeterías
- Catálogo de bebidas y postres
- Promociones del día
- Horarios especiales

### Tiendas Pequeñas
- Catálogo de productos
- Precios actualizados
- Contacto directo para pedidos

### Negocios Locales
- Servicios ofrecidos
- Portafolio visual
- Información de contacto

---

## 🌟 Ventajas del Plan Catálogo Digital

1. **Inversión única** - Sin mensualidades, pagas una vez
2. **Actualizable** - Tú mismo puedes cambiar precios y productos
3. **Siempre disponible** - Tu menú 24/7 en internet
4. **Genera ventas** - Los clientes pueden pedir directamente
5. **Profesional** - Diseño moderno que genera confianza
6. **Móvil-first** - La mayoría de tus clientes lo verán en su celular
7. **SEO incluido** - Apareces en Google cuando te busquen
8. **Código QR** - Úsalo en mesas, empaques, redes sociales

---

## 📦 Archivos Incluidos

```
/plan-catalogo-digital/
├── index.html          # Estructura del sitio (460 líneas)
├── styles.css          # Estilos completos (820 líneas)
├── script.js           # Funcionalidad interactiva (380 líneas)
└── README.md           # Esta documentación
```

**Total**: ~1,660 líneas de código optimizado y documentado

---

## 💡 Próximos Pasos

Una vez adquieras este plan:

1. **Personalización inicial**
   - Cambiamos nombre, logo y colores a tu marca
   - Agregamos tus productos/platillos reales
   - Configuramos tu número de WhatsApp

2. **Configuración técnica**
   - Dominio personalizado (tucatálogo.com)
   - Hosting en la nube (primer año incluido)
   - Certificado SSL (candado de seguridad)

3. **Entrega de QR**
   - Código QR en alta resolución
   - Diseños para imprimir
   - Instrucciones de uso

4. **Capacitación**
   - Te enseñamos a actualizar tu catálogo
   - Video tutorial personalizado
   - Soporte por 30 días

---

## 📞 Información de Contacto

**¿Interesado en el Plan Catálogo Digital?**

- **Precio**: $8,500 MXN (pago único)
- **Entrega**: 1-2 semanas
- **Incluye**: Dominio y hosting primer año

Visita [skyline.com](/) para más información o contactarnos.

---

## 🎨 Créditos

- **Diseño y desarrollo**: Skyline - Soluciones Digitales
- **Plan**: Catálogo Digital
- **Fuentes**: Google Fonts (Poppins, Playfair Display)
- **Iconos**: Emojis nativos + SVG custom

---

**✨ Este es un sitio demo - Todos los datos son ficticios ✨**

*Última actualización: Enero 2025*
