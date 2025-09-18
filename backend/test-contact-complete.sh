#!/bin/bash

echo "🧪 Iniciando pruebas completas del sistema de contacto"
echo "====================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

API_URL="https://kb9i36e9ue.execute-api.us-east-1.amazonaws.com/prod/contact"

echo -e "${BLUE}📍 URL del API: ${API_URL}${NC}"
echo ""

# Prueba 1: Verificar que el endpoint responde
echo -e "${YELLOW}🔍 Prueba 1: Verificando conectividad del API...${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" $API_URL)
if [ "$response" -eq 405 ]; then
    echo -e "${GREEN}✅ Endpoint responde (405 - Method Not Allowed es esperado para GET)${NC}"
else
    echo -e "${RED}❌ Endpoint no responde correctamente (código: $response)${NC}"
fi
echo ""

# Prueba 2: Probar método OPTIONS (CORS)
echo -e "${YELLOW}🔍 Prueba 2: Verificando CORS (OPTIONS)...${NC}"
cors_response=$(curl -s -o /dev/null -w "%{http_code}" -X OPTIONS $API_URL)
if [ "$cors_response" -eq 200 ]; then
    echo -e "${GREEN}✅ CORS configurado correctamente${NC}"
else
    echo -e "${RED}❌ Problema con CORS (código: $cors_response)${NC}"
fi
echo ""

# Prueba 3: Enviar datos de prueba
echo -e "${YELLOW}🔍 Prueba 3: Enviando formulario de prueba...${NC}"

# Datos de prueba
TEST_DATA='{
    "nombre": "Test Usuario",
    "empresa": "Skyline IT Prueba",
    "email": "contacto@skylineit.mx",
    "telefono": "+52 (555) 123-4567",
    "tamanoEmpresa": "11-50 empleados",
    "mensaje": "🧪 MENSAJE DE PRUEBA - Sistema de contacto funcionando correctamente. Fecha: '$(date)'"
}'

echo -e "${BLUE}📤 Enviando datos:${NC}"
echo "$TEST_DATA" | jq . 2>/dev/null || echo "$TEST_DATA"
echo ""

# Realizar la petición POST
echo -e "${YELLOW}⏳ Enviando petición...${NC}"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d "$TEST_DATA")

# Separar body y status code
body=$(echo "$response" | head -n -1)
status_code=$(echo "$response" | tail -n 1)

echo -e "${BLUE}📊 Respuesta del servidor:${NC}"
echo "Status Code: $status_code"
echo "Response Body:"
echo "$body" | jq . 2>/dev/null || echo "$body"
echo ""

# Evaluar resultado
if [ "$status_code" = "200" ]; then
    echo -e "${GREEN}🎉 ¡ÉXITO! El formulario de contacto está funcionando correctamente.${NC}"
    echo -e "${GREEN}📧 Revisa tu email para confirmar la recepción de los mensajes.${NC}"
elif [ "$status_code" = "400" ]; then
    echo -e "${YELLOW}⚠️  Error de validación - Revisa los datos enviados${NC}"
elif [ "$status_code" = "500" ]; then
    echo -e "${RED}❌ Error interno del servidor - Revisar logs de Lambda${NC}"
else
    echo -e "${RED}❌ Error inesperado - Status code: $status_code${NC}"
fi

echo ""
echo -e "${BLUE}🔧 Para revisar logs detallados:${NC}"
echo "aws logs tail /aws/lambda/SkylineContactStack-ContactFunction0F68BFE2-giZISiCz5mQ9 --follow"
echo ""
echo -e "${BLUE}📧 Si el test fue exitoso, deberías recibir 2 emails:${NC}"
echo "1. Notificación en contacto@skylineit.mx con los datos del formulario"
echo "2. Confirmación al usuario (en este caso también contacto@skylineit.mx)"
