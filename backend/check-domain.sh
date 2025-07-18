#!/bin/bash

# Script para verificar el estado del dominio skylineit.mx
# Verifica DNS, certificado SSL y configuración de CloudFront

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

echo "🔍 Verificando estado del dominio skylineit.mx"
echo "=============================================="

# Función para verificar si un comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar herramientas necesarias
print_status "Verificando herramientas necesarias..."

if command_exists dig; then
    print_success "dig encontrado"
else
    print_warning "dig no encontrado. Instala con: sudo apt-get install dnsutils (Ubuntu/Debian)"
fi

if command_exists nslookup; then
    print_success "nslookup encontrado"
else
    print_warning "nslookup no encontrado"
fi

echo ""

# Obtener outputs de CDK
print_status "Obteniendo información de los stacks..."

# Verificar si los stacks existen
if npx cdk list 2>/dev/null | grep -q "SkylineRoute53Stack"; then
    print_success "SkylineRoute53Stack encontrado"
    
    # Obtener Name Servers
    print_status "Name Servers configurados en Route53:"
    npx cdk outputs SkylineRoute53Stack 2>/dev/null | grep "NameServers" || print_warning "No se pudieron obtener los Name Servers"
    
else
    print_error "SkylineRoute53Stack no encontrado. ¿Has desplegado el stack de Route53?"
fi

if npx cdk list 2>/dev/null | grep -q "SkylineWebsiteStack"; then
    print_success "SkylineWebsiteStack encontrado"
    
    # Obtener información del website
    print_status "Información del website:"
    npx cdk outputs SkylineWebsiteStack 2>/dev/null || print_warning "No se pudieron obtener los outputs del website"
    
else
    print_error "SkylineWebsiteStack no encontrado. ¿Has desplegado el stack del website?"
fi

echo ""

# Verificar DNS
print_status "Verificando configuración DNS..."

if command_exists dig; then
    echo "NS Records para skylineit.mx:"
    dig NS skylineit.mx +short || print_warning "No se pudieron resolver los NS records"
    
    echo ""
    echo "A Records para skylineit.mx:"
    dig A skylineit.mx +short || print_warning "No se pudieron resolver los A records"
    
    echo ""
    echo "A Records para www.skylineit.mx:"
    dig A www.skylineit.mx +short || print_warning "No se pudieron resolver los A records para www"
    
elif command_exists nslookup; then
    echo "Usando nslookup:"
    nslookup skylineit.mx || print_warning "No se pudo resolver skylineit.mx"
else
    print_warning "No hay herramientas de DNS disponibles para verificar"
fi

echo ""

# Verificar certificado SSL
print_status "Verificando certificado SSL..."

if command_exists openssl; then
    print_status "Verificando certificado para skylineit.mx..."
    timeout 10 openssl s_client -connect skylineit.mx:443 -servername skylineit.mx </dev/null 2>/dev/null | openssl x509 -noout -dates 2>/dev/null || print_warning "No se pudo verificar el certificado SSL"
    
    print_status "Verificando certificado para www.skylineit.mx..."
    timeout 10 openssl s_client -connect www.skylineit.mx:443 -servername www.skylineit.mx </dev/null 2>/dev/null | openssl x509 -noout -dates 2>/dev/null || print_warning "No se pudo verificar el certificado SSL para www"
else
    print_warning "openssl no encontrado para verificar certificados"
fi

echo ""

# Verificar accesibilidad HTTP
print_status "Verificando accesibilidad HTTP..."

if command_exists curl; then
    print_status "Verificando https://skylineit.mx..."
    if curl -s -I https://skylineit.mx | head -n 1 | grep -q "200"; then
        print_success "skylineit.mx responde correctamente"
    else
        print_warning "skylineit.mx no responde o devuelve error"
    fi
    
    print_status "Verificando https://www.skylineit.mx..."
    if curl -s -I https://www.skylineit.mx | head -n 1 | grep -q "200"; then
        print_success "www.skylineit.mx responde correctamente"
    else
        print_warning "www.skylineit.mx no responde o devuelve error"
    fi
else
    print_warning "curl no encontrado para verificar accesibilidad HTTP"
fi

echo ""
echo "=============================================="
print_status "Verificación completada"
echo ""
echo "💡 Consejos:"
echo "• Si los DNS no resuelven, verifica los Name Servers en tu registrador"
echo "• La propagación DNS puede tardar hasta 48 horas"
echo "• El certificado SSL se valida automáticamente con DNS"
echo "• Puedes verificar la propagación global en: https://www.whatsmydns.net"
echo ""
echo "🔗 Recursos útiles:"
echo "• AWS Route53 Console: https://console.aws.amazon.com/route53/"
echo "• AWS Certificate Manager: https://console.aws.amazon.com/acm/"
echo "• AWS CloudFront Console: https://console.aws.amazon.com/cloudfront/"
echo "=============================================="
