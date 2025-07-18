# Configuración del Dominio skylineit.mx

Este documento explica cómo configurar el dominio personalizado `skylineit.mx` para tu sitio web de Skyline usando AWS Route53, CloudFront y Certificate Manager.

## 🚀 Despliegue Rápido

Para desplegar todo el sistema con dominio personalizado:

```bash
cd backend
npm run deploy:domain
```

## 📋 Arquitectura

```
skylineit.mx (Registrador) 
    ↓ Name Servers
Route53 Hosted Zone
    ↓ A Records
CloudFront Distribution
    ↓ Origin
S3 Bucket (Website)
```

## 🔧 Componentes

### 1. SkylineWebsiteStack
- **S3 Bucket**: Almacena los archivos estáticos del sitio web
- **CloudFront Distribution**: CDN global para mejor rendimiento
- **S3 Deployment**: Despliega automáticamente el contenido

### 2. SkylineDomainStack
- **Route53 Hosted Zone**: Gestiona DNS para skylineit.mx
- **SSL Certificate**: Certificado SSL/TLS automático
- **DNS Records**: A/AAAA records para el dominio y www

### 3. SkylineWebsiteWithDomainStack
- **CloudFront con SSL**: Distribution con certificado personalizado
- **Dominios múltiples**: skylineit.mx y www.skylineit.mx

## 📝 Pasos de Configuración

### Paso 1: Desplegar la Infraestructura

```bash
# Construir el frontend
cd /home/maya/skyline-website
npm run build

# Desplegar toda la infraestructura
cd backend
npm run deploy:domain
```

### Paso 2: Configurar Name Servers

1. **Obtener Name Servers**:
   ```bash
   npm run outputs SkylineDomainStack
   ```

2. **Configurar en el Registrador**:
   - Ve al panel de control donde compraste `skylineit.mx`
   - Busca la sección "DNS" o "Name Servers"
   - Reemplaza los name servers actuales con los de AWS Route53
   - Guarda los cambios

### Paso 3: Verificar la Configuración

```bash
# Verificar estado del dominio
npm run check:domain

# Ver todos los outputs
npm run outputs
```

## ⏱️ Tiempos de Propagación

| Componente | Tiempo Estimado |
|------------|----------------|
| Route53 Hosted Zone | Inmediato |
| SSL Certificate | 5-30 minutos |
| Name Server Propagation | 1-48 horas |
| CloudFront Distribution | 15-20 minutos |

## 🔍 Verificación Manual

### DNS
```bash
# Verificar Name Servers
dig NS skylineit.mx

# Verificar A Records
dig A skylineit.mx
dig A www.skylineit.mx
```

### SSL Certificate
```bash
# Verificar certificado
openssl s_client -connect skylineit.mx:443 -servername skylineit.mx
```

### Conectividad
```bash
# Verificar respuesta HTTP
curl -I https://skylineit.mx
curl -I https://www.skylineit.mx
```

## 🛠️ Comandos Útiles

```bash
# Ver todos los stacks
npm run list

# Ver diferencias antes de deploy
npm run diff

# Obtener outputs de un stack específico
npx cdk outputs SkylineDomainStack

# Destruir todo (¡CUIDADO!)
npm run destroy:all
```

## 🔧 Troubleshooting

### Problema: El dominio no resuelve
**Solución**: 
1. Verificar que los Name Servers estén configurados correctamente
2. Esperar hasta 48 horas para propagación DNS
3. Usar herramientas como https://www.whatsmydns.net

### Problema: Certificado SSL no válido
**Solución**:
1. El certificado se valida automáticamente vía DNS
2. Verificar que la Hosted Zone esté correcta
3. Puede tardar hasta 30 minutos

### Problema: Error 403/404 en CloudFront
**Solución**:
1. Verificar que el S3 bucket tenga el contenido
2. Verificar que el CloudFront apunte al bucket correcto
3. Crear invalidación: `aws cloudfront create-invalidation --distribution-id [ID] --paths "/*"`

## 📊 Monitoreo

### AWS Console Links
- [Route53](https://console.aws.amazon.com/route53/)
- [Certificate Manager](https://console.aws.amazon.com/acm/)
- [CloudFront](https://console.aws.amazon.com/cloudfront/)
- [S3](https://console.aws.amazon.com/s3/)

### Herramientas Externas
- [DNS Checker](https://www.whatsmydns.net/)
- [SSL Checker](https://www.ssllabs.com/ssltest/)
- [Website Speed Test](https://gtmetrix.com/)

## 💰 Costos Estimados (USD/mes)

| Servicio | Costo Estimado |
|----------|----------------|
| Route53 Hosted Zone | $0.50 |
| Route53 Queries | $0.40 |
| CloudFront | $0.085/GB |
| S3 Storage | $0.023/GB |
| Certificate Manager | $0 (gratis) |

**Total estimado para sitio pequeño-mediano: ~$5-15/mes**

## 🔒 Seguridad

- ✅ SSL/TLS automático
- ✅ HTTPS obligatorio
- ✅ Headers de seguridad en CloudFront
- ✅ Acceso restringido al bucket S3
- ✅ CORS configurado correctamente

## 📞 Soporte

Si tienes problemas:

1. **Revisar logs**: `npm run check:domain`
2. **AWS Support**: Para problemas de infraestructura
3. **Documentación CDK**: https://docs.aws.amazon.com/cdk/
4. **Skyline Team**: Para problemas específicos del proyecto

---

**Última actualización**: 18 de Julio, 2025
**Versión**: 1.0.0
