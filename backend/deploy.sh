#!/bin/bash

# Script para preparar y desplegar la aplicación de Skyline a AWS

echo "🚀 Iniciando deployment de Skyline Website..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
  echo "❌ Error: Debes ejecutar este script desde la raíz del proyecto"
  exit 1
fi

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
npm install

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

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
npm install

# Verificar que AWS CLI está instalado
if ! command -v aws &> /dev/null; then
  echo "❌ Error: AWS CLI no está instalado. Instálalo desde https://aws.amazon.com/cli/"
  exit 1
fi

# Verificar que las credenciales de AWS están configuradas
if ! aws sts get-caller-identity &> /dev/null; then
  echo "❌ Error: Las credenciales de AWS no están configuradas"
  echo "Ejecuta: aws configure"
  exit 1
fi

# Hacer bootstrap de CDK (solo necesario la primera vez)
echo "🎯 Haciendo bootstrap de CDK..."
npx cdk bootstrap

# Sintetizar el stack (verificar que todo está bien)
echo "🔍 Sintetizando el stack..."
npx cdk synth

# Desplegar el stack
echo "🚀 Desplegando el stack..."
npx cdk deploy --require-approval never

echo "✅ Deployment completado!"
echo "🌐 Tu sitio web estará disponible en unos minutos en la URL que aparece arriba."
