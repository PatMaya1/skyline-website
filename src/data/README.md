# Technologies Component - Data Structure

Este documento explica la nueva estructura de datos del componente `Technologies.jsx` después de la refactorización para separar los datos hardcodeados en archivos JSON.

## Archivos de Datos

### 📁 `/src/data/categories.json`
Contiene las categorías de tecnologías con sus iconos correspondientes.

```json
[
  {
    "id": "all",
    "name": "Todas las Tecnologías", 
    "icon": "Globe"
  }
]
```

**Campos:**
- `id`: Identificador único de la categoría
- `name`: Nombre visible de la categoría
- `icon`: Nombre del icono de Lucide React (debe estar importado en `/src/utils/icons.js`)

### 📁 `/src/data/technologies.json`
Lista todas las tecnologías con sus detalles.

```json
[
  {
    "name": "Python",
    "category": "automatizacion",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "description": "Automatización de procesos con scripts y workflows",
    "color": "from-yellow-400 to-yellow-600"
  }
]
```

**Campos:**
- `name`: Nombre de la tecnología
- `category`: ID de la categoría (debe coincidir con un `id` en categories.json)
- `logo`: URL del logo/icono de la tecnología
- `description`: Descripción corta de la tecnología
- `color`: Clases de Tailwind CSS para el gradiente de color

### 📁 `/src/data/awsCertifications.json`
Certificaciones AWS para el carrusel.

```json
[
  {
    "name": "AWS Solutions Architect",
    "level": "Professional",
    "image": "https://images.credly.com/size/340x340/images/...",
    "description": "Diseño y deployment de sistemas escalables en AWS",
    "color": "from-orange-400 to-orange-600"
  }
]
```

**Campos:**
- `name`: Nombre de la certificación
- `level`: Nivel de la certificación (Professional, Associate, Specialty, Foundational)
- `image`: URL de la imagen de la certificación
- `description`: Descripción de la certificación
- `color`: Clases de Tailwind CSS para el gradiente de color

### 📁 `/src/data/stats.json`
Estadísticas mostradas en el componente.

```json
{
  "technologiesSection": [
    {
      "value": "25+",
      "label": "Tecnologías",
      "color": "blue-600"
    }
  ],
  "awsSection": [
    {
      "value": "6+",
      "label": "Certificaciones AWS",
      "color": "orange-600"
    }
  ]
}
```

**Campos:**
- `value`: Valor numérico o texto a mostrar
- `label`: Etiqueta descriptiva
- `color`: Color de Tailwind CSS (sin prefijo `text-`)

### 📁 `/src/data/config.json`
Configuración del comportamiento del componente.

```json
{
  "carousel": {
    "autoRotationInterval": 4000,
    "showPrevNextOnDesktop": true
  },
  "display": {
    "initialTechnologiesShown": 8,
    "animationDelayMultiplier": 0.1
  },
  "ui": {
    "sectionBackgroundClass": "py-20 bg-blue-100 to-indigo-100 relative overflow-hidden",
    "titleGradient": "bg-gradient-to-r from-blue-800 via-gray-800 to-blue-800",
    "buttonGradient": {
      "active": "bg-gradient-to-r from-blue-400 to-blue-700",
      "inactive": "bg-white/80 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }
  }
}
```

## Archivo de Utilidades

### 📁 `/src/utils/icons.js`
Maneja la importación y mapeo de iconos de Lucide React.

```javascript
import { Globe, Smartphone, Shield, /* ... */ } from 'lucide-react';

export const iconMap = {
  Globe,
  Smartphone,
  Shield,
  // ...
};

export const getIcon = (iconName, props = {}) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent {...props} /> : null;
};
```

## Cómo Agregar/Modificar Datos

### ➕ Agregar una nueva tecnología:
1. Abre `/src/data/technologies.json`
2. Agrega un nuevo objeto al array con todos los campos requeridos
3. Asegúrate de que la `category` coincida con un ID existente en `categories.json`

### ➕ Agregar una nueva categoría:
1. Abre `/src/data/categories.json`
2. Agrega un nuevo objeto con `id`, `name` e `icon`
3. Si el icono no existe, agrégalo a `/src/utils/icons.js`

### ➕ Agregar una nueva certificación AWS:
1. Abre `/src/data/awsCertifications.json`
2. Agrega un nuevo objeto con todos los campos requeridos

### 🔧 Modificar configuración:
1. Abre `/src/data/config.json`
2. Modifica los valores según necesites:
   - `autoRotationInterval`: Tiempo en ms entre rotaciones automáticas del carrusel
   - `initialTechnologiesShown`: Número de tecnologías mostradas inicialmente
   - `animationDelayMultiplier`: Multiplicador para el delay de animaciones

## Beneficios de esta Estructura

✅ **Separación de responsabilidades**: Datos separados de la lógica del componente
✅ **Fácil mantenimiento**: Modificar datos sin tocar código JavaScript
✅ **Escalabilidad**: Agregar nuevas categorías o tecnologías es simple
✅ **Consistencia**: Estructura uniforme para todos los datos
✅ **Configuración flexible**: Parámetros del UI centralizados
✅ **Reutilización**: Los datos pueden ser usados en otros componentes

## Notas Importantes

- Los colores en Tailwind CSS deben ser válidos
- Las URLs de imágenes deben ser accesibles
- Los IDs de categorías deben ser únicos
- Los iconos deben estar importados en `icons.js` antes de usarlos
- El archivo `config.json` controla el comportamiento visual y temporal del componente
