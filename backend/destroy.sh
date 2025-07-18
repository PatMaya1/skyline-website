#!/bin/bash

# Script para destruir la infraestructura de AWS

echo "🗑️  Destruyendo infraestructura de Skyline Website..."

# Verificar que estamos en el directorio del backend
if [ ! -f "cdk.json" ]; then
  echo "❌ Error: Debes ejecutar este script desde la carpeta backend"
  exit 1
fi

# Confirmar la destrucción
read -p "¿Estás seguro de que quieres destruir toda la infraestructura? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Operación cancelada"
  exit 0
fi

# Destruir el stack
echo "🔥 Destruyendo el stack..."
npx cdk destroy --force

echo "✅ Infraestructura destruida!"
