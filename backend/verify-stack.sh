#!/bin/bash

# Script para verificar la compilación del stack de contacto
set -e

echo "🔍 Verificando compilación del stack de contacto..."
echo "================================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "cdk.json" ]; then
    echo "❌ Error: Este script debe ejecutarse desde el directorio backend/"
    exit 1
fi

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    exit 1
fi

# Verificar que las dependencias estén instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Compilar el proyecto
echo "🔨 Compilando TypeScript..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Compilación exitosa!"
else
    echo "❌ Error en la compilación"
    exit 1
fi

# Verificar sintaxis de CDK
echo "🔍 Verificando sintaxis de CDK..."
npm run synth:contact

if [ $? -eq 0 ]; then
    echo "✅ Stack de contacto válido!"
    echo ""
    echo "🎉 Todo está listo para el despliegue!"
    echo ""
    echo "Próximos pasos:"
    echo "1. Configura AWS SES (verifica tu email)"
    echo "2. Ejecuta: ./deploy-contact.sh"
    echo "3. Actualiza la URL del API en el frontend"
else
    echo "❌ Error en la sintaxis del stack"
    exit 1
fi
