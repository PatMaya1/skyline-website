# 🌐 Configuración del Dominio skylineit.mx - Guía Rápida (2 Stacks)

## ✅ ¿Qué hemos creado?

He configurado completamente la infraestructura para conectar tu dominio `skylineit.mx` con tu sitio web usando AWS, separado en **2 stacks independientes**:

### 🏗️ Infraestructura Creada

1. **SkylineRoute53Stack**: Solo Route53 Hosted Zone
   - ✅ Hosted Zone para `skylineit.mx`
   - ✅ Outputs con Name Servers para configurar en tu registrador
   - ✅ Este stack solo necesita desplegarse una vez

2. **SkylineWebsiteStack**: Website completo con dominio personalizado
   - ✅ S3 Bucket para archivos estáticos
   - ✅ CloudFront Distribution con SSL
   - ✅ Certificado SSL automático para `skylineit.mx` y `www.skylineit.mx`
   - ✅ Registros DNS A y AAAA
   - ✅ Deployment automático del frontend

### 📁 Archivos Nuevos Creados

```
backend/
├── lib/
│   ├── skyline-route53-stack.ts    # Stack solo para Route53
│   ├── skyline-website-stack.ts    # Stack principal con website + SSL + DNS
│   └── config.ts                   # Configuración actualizada
├── bin/
│   └── skyline-website.ts          # Configuración de ambos stacks
├── deploy-domain.sh                # Script de deploy automático
├── check-domain.sh                 # Script de verificación
├── DOMAIN-SETUP.md                 # Documentación completa
└── package.json                    # Scripts actualizados
```

## 🚀 Despliegue (Proceso en 2 fases)

### Opción 1: Deploy automático (Recomendado)
```bash
cd /home/maya/skyline-website/backend
npm run deploy:domain
```

### Opción 2: Deploy manual paso a paso
```bash
# Paso 1: Desplegar Route53 primero
npm run deploy:route53

# Paso 2: Configurar Name Servers en tu registrador
npm run outputs:route53

# Paso 3: Desplegar el website con SSL
npm run deploy:website
```

## 🔧 Configuración del Registrador (CRUCIAL)

Después del deploy del primer stack:

1. **Obtener Name Servers**:
   ```bash
   npm run outputs:route53
   ```

2. **Configurarlos en tu registrador**:
   - Ve donde compraste `skylineit.mx`
   - Cambia los Name Servers por los de AWS Route53
   - Guarda los cambios
   - **Espera 5-10 minutos antes de continuar**

3. **Deploy del website**:
   ```bash
   npm run deploy:website
   ```

## ⏱️ Tiempos

- **Route53 Stack**: 2-3 minutos
- **Configuración Name Servers**: Manual (5 minutos)
- **Website Stack**: 15-25 minutos
- **Certificado SSL**: Se valida automáticamente (5-30 min)
- **Propagación DNS**: 1-48 horas total

## 🔍 Verificación

```bash
# Ver estado completo
npm run check:domain

# Ver outputs específicos
npm run outputs:route53    # Name Servers
npm run outputs:website    # URLs y certificado
```

## 📋 URLs Finales

Cuando todo esté configurado:
- ✅ `https://skylineit.mx`
- ✅ `https://www.skylineit.mx`
- ✅ Redirección automática de HTTP a HTTPS
- ✅ Certificado SSL válido
- ✅ CDN global (CloudFront)

## � Ventajas de la Nueva Estructura

### ✅ Stack Route53 (SkylineRoute53Stack)
- **Una sola vez**: Solo necesitas desplegarlo una vez
- **Estable**: Los Name Servers no cambian
- **Independiente**: No afecta el website al actualizar
- **Fácil configuración**: Outputs claros para el registrador

### ✅ Stack Website (SkylineWebsiteStack)
- **Actualizable**: Puedes actualizar el website sin afectar DNS
- **SSL automático**: Certificado se crea y valida automáticamente
- **Registros DNS**: Se crean automáticamente al tener la Hosted Zone
- **Deployment**: Incluye el deployment del frontend

## 📊 Comandos Útiles

```bash
# Deployment
npm run deploy:route53     # Solo Route53
npm run deploy:website     # Solo website
npm run deploy:domain      # Ambos (interactivo)

# Información
npm run outputs:route53    # Name Servers
npm run outputs:website    # URLs del website
npm run check:domain       # Estado completo

# Gestión
npm run list               # Ver todos los stacks
npm run destroy:all        # Destruir todo (¡CUIDADO!)
```

## � Costo Estimado

~$5-15 USD/mes para un sitio web pequeño-mediano

## 🆘 Si Algo Sale Mal

```bash
# Ver estado detallado
npm run check:domain

# Ver logs de deployment
npx cdk deploy SkylineWebsiteStack --verbose

# Recrear solo el website (mantiene Route53)
npx cdk destroy SkylineWebsiteStack
npm run deploy:website

# Verificar Name Servers
dig NS skylineit.mx
```

## 📞 Siguiente Paso

**¡Tu dominio skylineit.mx está listo para desplegarse! 🎉**

**Comando para empezar**:
```bash
cd /home/maya/skyline-website/backend
npm run deploy:domain
```

---

**Última actualización**: 18 de Julio, 2025  
**Versión**: 2.0.0 (2 Stacks separados)
