# Skyline Website - Backend Infrastructure

Este directorio contiene la infraestructura como código (IaC) para desplegar el sitio web de Skyline en AWS usando CDK.

## Estructura

```
backend/
├── bin/
│   └── skyline-website.ts    # Punto de entrada de la aplicación CDK
├── lib/
│   ├── skyline-website-stack.ts  # Definición del stack principal
│   └── config.ts                 # Configuraciones del proyecto
├── cdk.json                  # Configuración de CDK
├── package.json             # Dependencias de Node.js
├── tsconfig.json           # Configuración de TypeScript
├── deploy.sh              # Script de despliegue automatizado
├── update-content.sh      # Script para actualizar solo el contenido
├── destroy.sh            # Script para destruir la infraestructura
└── README.md            # Esta documentación
```

## Recursos AWS que se crean

- **S3 Bucket**: Para hospedar los archivos estáticos del sitio web
- **CloudFront Distribution**: CDN para entregar el contenido de manera rápida
- **Origin Access Control**: Para securizar el acceso entre CloudFront y S3
- **Cache Policies**: Optimización de cache para diferentes tipos de archivos

## Requisitos previos

1. **AWS CLI**: Instalar y configurar con credenciales válidas
   ```bash
   aws configure
   ```

2. **Node.js**: Versión 18 o superior
3. **CDK**: Se instalará automáticamente con npm

## Despliegue rápido

### Opción 1: Script automatizado (recomendado)

```bash
# Desde la raíz del proyecto
./backend/deploy.sh
```

### Opción 2: Pasos manuales

1. **Construir el frontend**:
   ```bash
   # Desde la raíz del proyecto
   npm install
   npm run build
   ```

2. **Instalar dependencias del backend**:
   ```bash
   cd backend
   npm install
   ```

3. **Bootstrap de CDK** (solo la primera vez):
   ```bash
   npx cdk bootstrap
   ```

4. **Desplegar**:
   ```bash
   npx cdk deploy
   ```

## Comandos útiles

```bash
# Ver los cambios que se aplicarán
npx cdk diff

# Sintetizar el CloudFormation template
npx cdk synth

# Listar todos los stacks
npx cdk list

# Destruir la infraestructura
npx cdk destroy
# o usar el script
./destroy.sh
```

## Actualizar el sitio web

Para actualizar el contenido del sitio web:

1. **Actualización rápida** (solo contenido):
   ```bash
   ./backend/update-content.sh
   ```

2. **Actualización completa** (infraestructura + contenido):
   ```bash
   ./backend/deploy.sh
   ```

El script automáticamente:
- Construye la nueva versión del frontend
- Sube los archivos al S3
- Invalida el cache de CloudFront

## Configuración de dominio personalizado

Para usar un dominio personalizado, modifica las configuraciones en `lib/config.ts`:

```typescript
domain: {
  domainName: 'tu-dominio.com',
  hostedZoneId: 'TU_ZONE_ID',
  certificateArn: 'arn:aws:acm:us-east-1:123456789:certificate/...',
}
```

## Costos estimados

- **S3**: ~$0.023 por GB/mes
- **CloudFront**: ~$0.085 por GB transferido
- **Route 53**: ~$0.50 por zona hospedada/mes (si usas dominio personalizado)

## Seguridad

- El bucket S3 está configurado para acceso privado
- CloudFront usa Origin Access Control para acceso seguro
- HTTPS está habilitado por defecto
- No hay acceso público directo al bucket

## Troubleshooting

### Error: "aws-cdk-lib not found"
```bash
cd backend
npm install
```

### Error: "CDK not bootstrapped"
```bash
npx cdk bootstrap
```

### Error: "Access denied"
Verificar que las credenciales de AWS están configuradas correctamente:
```bash
aws sts get-caller-identity
```

## Limpieza

Para destruir toda la infraestructura y evitar costos:

```bash
./backend/destroy.sh
```

**⚠️ Advertencia**: Esto eliminará permanentemente todos los recursos creados.
