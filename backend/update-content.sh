#!/bin/bash

# Script para actualizar solo el contenido del sitio web
# (sin reconstruir la infraestructura)

echo "🔄 Actualizando contenido del sitio web..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
  echo "❌ Error: Debes ejecutar este script desde la raíz del proyecto"
  exit 1
fi

# Construir el proyecto frontend
echo "🔨 Construyendo el proyecto frontend..."
npm run build

# Verificar que la carpeta dist fue creada
if [ ! -d "dist" ]; then
  echo "❌ Error: No se pudo crear la carpeta dist"
  exit 1
fi

# Cambiar al directorio del backend
cd backend

# Verificar que el stack existe
if ! npx cdk list | grep -q "SkylineWebsiteStack"; then
  echo "❌ Error: El stack no existe. Ejecuta primero './deploy.sh'"
  exit 1
fi

# Obtener outputs del stack
echo "📊 Obteniendo información del stack..."
npx cdk deploy --outputs-file outputs.json --require-approval never

# Verificar que se creó el archivo de outputs
if [ ! -f "outputs.json" ]; then
  echo "❌ Error: No se pudo obtener la información del stack"
  exit 1
fi

# Leer valores desde el archivo JSON
BUCKET_NAME=$(cat outputs.json | grep -o '"BucketName":"[^"]*"' | cut -d'"' -f4)
DISTRIBUTION_ID=$(cat outputs.json | grep -o '"DistributionId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
  echo "❌ Error: No se pudo obtener la información del bucket o distribución"
  exit 1
fi

echo "🪣 Bucket: $BUCKET_NAME"
echo "🌐 Distribution: $DISTRIBUTION_ID"

# Subir archivos al S3
echo "📤 Subiendo archivos al S3..."
aws s3 sync ../dist/ s3://$BUCKET_NAME/ --delete

# Invalidar cache de CloudFront
echo "🔄 Invalidando cache de CloudFront..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "✅ Actualización completada!"
echo "🌐 Los cambios estarán disponibles en unos minutos."

# Limpiar archivo temporal
rm -f outputs.json
