#!/bin/bash

# Script para desplegar el servicio de contacto de Skyline
set -e

echo "🚀 Desplegando Skyline Contact Stack..."
echo "======================================"

# Verificar que estamos en el directorio correcto
if [ ! -f "cdk.json" ]; then
    echo "❌ Error: Este script debe ejecutarse desde el directorio backend/"
    exit 1
fi

# Construir el proyecto
echo "📦 Construyendo el proyecto..."
npm run build

# Instalar dependencias de la función Lambda
echo "📦 Instalando dependencias de Lambda..."
cd lambda
npm install --production
cd ..

# Verificar la configuración de CDK
echo "🔍 Verificando configuración..."
npm run synth:contact

# Desplegar el stack
echo "🚀 Desplegando el stack de contacto..."
npm run deploy:contact

# Mostrar los outputs
echo "📊 Outputs del stack:"
npm run outputs:contact

echo ""
echo "✅ ¡Despliegue completado!"
echo ""
echo "📝 Notas importantes:"
echo "1. Verifica tu email en la consola de AWS SES para recibir notificaciones"
echo "2. El endpoint del API está disponible en los outputs"
echo "3. Actualiza tu frontend con la nueva URL del API"
echo ""
echo "🔗 Enlaces útiles:"
echo "- Consola AWS SES: https://console.aws.amazon.com/ses/"
echo "- Consola AWS Lambda: https://console.aws.amazon.com/lambda/"
echo "- Consola AWS API Gateway: https://console.aws.amazon.com/apigateway/"
