# Skyline Website

Sitio web corporativo para Skyline - Consultoría Tecnológica. Una empresa dedicada a transformar y optimizar negocios a través de soluciones tecnológicas avanzadas.

## 🌟 Características

- **Diseño Moderno**: Interfaz atractiva y responsiva con Tailwind CSS
- **Animaciones Fluidas**: Implementadas con Framer Motion
- **Optimizado para SEO**: Estructura semántica y meta tags
- **Deployment Automatizado**: Infraestructura como código con AWS CDK
- **Alta Performance**: Optimizado para velocidad de carga

## 🚀 Deployment a AWS

Este proyecto incluye infraestructura completa para deployment en AWS usando CDK.

### Deployment Rápido

```bash
# Deployment completo (primera vez)
./backend/deploy.sh

# Solo actualizar contenido (deployments posteriores)
./backend/update-content.sh
```

### Recursos AWS Creados

- **S3 Bucket**: Almacenamiento de archivos estáticos
- **CloudFront**: CDN global para entrega rápida
- **Origin Access Control**: Seguridad entre CloudFront y S3

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de la build
npm run preview
```

## 📁 Estructura del Proyecto

```
skyline-website/
├── src/
│   ├── components/         # Componentes React
│   │   ├── Header.jsx     # Navegación
│   │   ├── Hero.jsx       # Sección principal
│   │   ├── Services.jsx   # Servicios ofrecidos
│   │   ├── Process.jsx    # Proceso de trabajo
│   │   ├── Contact.jsx    # Formulario de contacto
│   │   └── Footer.jsx     # Pie de página
│   ├── assets/            # Recursos estáticos
│   └── main.jsx          # Punto de entrada
├── backend/              # Infraestructura AWS CDK
│   ├── lib/             # Definiciones de stack
│   ├── bin/             # Entry point CDK
│   ├── deploy.sh        # Script de deployment
│   ├── update-content.sh # Script de actualización
│   └── destroy.sh       # Script de destrucción
└── public/              # Archivos públicos
```

## 🔧 Tecnologías Utilizadas

- **Frontend**: React, Vite, Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Infraestructura**: AWS CDK, TypeScript
- **Deployment**: AWS S3, CloudFront

## 📖 Documentación Adicional

- [Documentación del Backend](./backend/README.md)
- [Guía de Deployment](./backend/README.md#despliegue-rápido)

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de features (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es propiedad de Skyline Consultoría Tecnológica.
