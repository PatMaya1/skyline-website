#!/bin/bash

# Script para desplegar el dominio skylineit.mx con Route53
# Este script despliega los stacks en el orden correcto para configurar el dominio

set -e

echo "🚀 Desplegando Skyline Website con dominio personalizado skylineit.mx"
echo "=================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con color
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "cdk.json" ]; then
    print_error "No se encontró cdk.json. Ejecuta este script desde el directorio backend/"
    exit 1
fi

# Verificar que el build del frontend existe
if [ ! -d "../dist" ]; then
    print_warning "No se encontró el directorio dist. Construyendo el frontend..."
    cd ..
    npm run build
    cd backend
    print_success "Frontend construido exitosamente"
fi

print_status "Paso 1: Instalando dependencias de CDK..."
npm install

print_status "Paso 2: Sintetizando stacks..."
npx cdk synth

print_status "Paso 3: Desplegando stack de Route53 (Hosted Zone)..."
npx cdk deploy SkylineRoute53Stack --require-approval never

print_success "¡Route53 Hosted Zone creada!"
print_warning "IMPORTANTE: Ahora debes configurar los Name Servers en tu registrador"
echo ""

# Mostrar los Name Servers
print_status "Obteniendo Name Servers..."
npx cdk outputs SkylineRoute53Stack

echo ""
print_warning "PAUSA OBLIGATORIA: Configuración de Name Servers"
echo "=================================================="
echo "1. Ve a tu registrador de dominio (donde compraste skylineit.mx)"
echo "2. Busca la sección DNS o Name Servers"
echo "3. Reemplaza los Name Servers actuales con los mostrados arriba"
echo "4. Guarda los cambios y espera 5-10 minutos para propagación inicial"
echo ""
echo "¿Has configurado los Name Servers? (y/n)"
read -r response

if [[ "$response" != "y" && "$response" != "Y" ]]; then
    print_warning "Configura los Name Servers y vuelve a ejecutar este script"
    print_status "Para continuar después, ejecuta: npx cdk deploy SkylineWebsiteStack"
    exit 0
fi

print_status "Paso 4: Esperando 30 segundos para propagación DNS inicial..."
sleep 30

print_status "Paso 5: Desplegando website con certificado SSL y registros DNS..."
print_warning "NOTA: El certificado SSL puede tardar hasta 30 minutos en validarse"
npx cdk deploy SkylineWebsiteStack --require-approval never

print_success "¡Despliegue completado!"
echo ""
echo "=================================================="
echo "🎉 Tu sitio web está listo en:"
echo ""

# Mostrar outputs del website stack
npx cdk outputs SkylineWebsiteStack

echo ""
echo "📝 IMPORTANTE: Verificación final"
echo "=================================================="
print_warning "Para verificar que todo funciona:"
echo "1. Espera 5-15 minutos para que el certificado SSL se valide"
echo "2. Verifica que tu dominio responda: https://skylineit.mx"
echo "3. Verifica que www funcione: https://www.skylineit.mx"
echo ""
echo "🔍 Para monitorear el progreso:"
echo "   • Certificado SSL: AWS Certificate Manager Console"
echo "   • DNS: https://www.whatsmydns.net/#NS/skylineit.mx"
echo ""
echo "📊 Para verificar el estado ejecuta:"
echo "   ./check-domain.sh"
echo "=================================================="
