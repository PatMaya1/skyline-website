#!/bin/bash

# Script para probar el servicio de contacto localmente
set -e

echo "🧪 Iniciando pruebas del servicio de contacto..."
echo "============================================="

# Verificar que el stack esté desplegado
if ! aws cloudformation describe-stacks --stack-name SkylineContactStack >/dev/null 2>&1; then
    echo "❌ Error: El stack SkylineContactStack no está desplegado"
    echo "Ejecuta primero: ./deploy-contact.sh"
    exit 1
fi

# Obtener la URL del API
API_URL=$(aws cloudformation describe-stacks \
    --stack-name SkylineContactStack \
    --query 'Stacks[0].Outputs[?OutputKey==`ContactApiEndpoint`].OutputValue' \
    --output text)

if [ -z "$API_URL" ]; then
    echo "❌ Error: No se pudo obtener la URL del API"
    exit 1
fi

echo "🔗 URL del API: $API_URL"
echo ""

# Datos de prueba
TEST_DATA='{
  "nombre": "Juan Pérez",
  "empresa": "Empresa de Prueba",
  "email": "contacto@skylineit.mx",
  "telefono": "+1 (555) 123-4567",
  "tamanoEmpresa": "11-50 empleados",
  "mensaje": "Este es un mensaje de prueba desde el script de testing. Por favor ignore este email."
}'

echo "📤 Enviando datos de prueba..."
echo "$TEST_DATA" | jq .

# Realizar la prueba
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "$TEST_DATA")

# Separar el body y el status code
body=$(echo "$response" | head -n -1)
status_code=$(echo "$response" | tail -n 1)

echo ""
echo "📊 Respuesta del servidor:"
echo "Status Code: $status_code"
echo "Body: $body" | jq .

if [ "$status_code" = "200" ]; then
    echo ""
    echo "✅ ¡Prueba exitosa! El servicio de contacto está funcionando correctamente."
else
    echo ""
    echo "❌ Error en la prueba. Status code: $status_code"
    exit 1
fi

echo ""
echo "📧 Verifica tu email para confirmar que llegó el mensaje de prueba."
