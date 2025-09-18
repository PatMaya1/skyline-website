# 🚀 Guía de Despliegue Completo - Skyline Contact Service

Esta guía te ayudará a desplegar el servicio de contacto completo desde cero.

## 📋 Pre-requisitos

### 1. Configuración de AWS
- [ ] AWS CLI instalado y configurado con credenciales válidas
- [ ] Permisos para crear recursos de Lambda, API Gateway, SES, IAM
- [ ] Región configurada (recomendado: us-east-1 para SES)

### 2. Herramientas de desarrollo
- [ ] Node.js 18+ instalado
- [ ] AWS CDK instalado globalmente: `npm install -g aws-cdk`
- [ ] Git instalado

### 3. Verificación de acceso
```bash
# Verificar AWS CLI
aws sts get-caller-identity

# Verificar CDK
cdk --version
```

## 🎯 Paso 1: Configuración inicial

### 1.1 Clonar y configurar el proyecto
```bash
cd /path/to/your/project/backend
npm install
```

### 1.2 Bootstrap CDK (solo la primera vez)
```bash
cdk bootstrap
```

## 📧 Paso 2: Configurar AWS SES

### 2.1 Verificar dominio o email
En la consola de AWS SES:

1. Ve a **"Verified identities"**
2. Haz clic en **"Create identity"**
3. Selecciona **"Email address"** 
4. Ingresa: `contacto@skylineit.mx`
5. Haz clic en **"Create identity"**
6. **¡IMPORTANTE!** Revisa tu email y haz clic en el enlace de verificación

### 2.2 Salir del Sandbox (para producción)
Si quieres recibir emails de cualquier dirección:

1. Ve a **"Account dashboard"** en SES
2. Haz clic en **"Request production access"**
3. Completa el formulario explicando el uso
4. Espera la aprobación (24-48 horas)

## 🏗️ Paso 3: Desplegar la infraestructura

### 3.1 Construir el proyecto
```bash
cd backend
npm run build
```

### 3.2 Instalar dependencias de Lambda
```bash
cd lambda
npm install --production
cd ..
```

### 3.3 Desplegar el stack de contacto
```bash
./deploy-contact.sh
```

El script te mostrará:
- ✅ Estado de la construcción
- ✅ Proceso de despliegue
- ✅ URLs y endpoints generados

### 3.4 Obtener la URL del API
Al final del despliegue verás algo como:
```
SkylineContactStack.ContactApiEndpoint = https://abc123.execute-api.us-east-1.amazonaws.com/prod/contact
```

**¡Guarda esta URL!** La necesitarás para el frontend.

## 🌐 Paso 4: Configurar el Frontend

### 4.1 Crear archivo de entorno
En la raíz del proyecto frontend:

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar con la URL real
echo "VITE_CONTACT_API_URL=https://tu-api-id.execute-api.us-east-1.amazonaws.com/prod/contact" > .env
```

### 4.2 Instalar dependencias del frontend
```bash
npm install
```

### 4.3 Probar en desarrollo
```bash
npm run dev
```

## 🧪 Paso 5: Pruebas

### 5.1 Probar el API directamente
```bash
cd backend
./test-contact.sh
```

### 5.2 Probar el formulario web
1. Abre tu sitio web en desarrollo
2. Ve a la sección de contacto
3. Llena el formulario con datos reales
4. Haz clic en "Solicitar Análisis Gratuito"
5. Verifica que recibes el email

## 🐛 Troubleshooting

### Problema: "Email address not verified"
**Solución:**
```bash
# Verificar el estado de tu email
aws sesv2 get-email-identity --email-identity contacto@skylineit.mx
```

Si muestra `VerificationStatus: "Pending"`, revisa tu email.

### Problema: "CORS error" en el frontend
**Solución:**
1. Verifica que la URL del API sea correcta en `.env`
2. Asegúrate de que el origen esté permitido en el stack de CDK

### Problema: Lambda timeout
**Solución:**
```bash
# Ver logs de Lambda
aws logs tail /aws/lambda/SkylineContactStack-ContactFunction --follow
```

### Problema: No llegan los emails
**Verificaciones:**
1. ¿El email está verificado en SES?
2. ¿Estás enviando desde/hacia emails verificados?
3. ¿Tu cuenta de SES está fuera del sandbox?

## 📊 Paso 6: Monitoreo

### 6.1 Verificar métricas
```bash
# Ver invocaciones de Lambda
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Invocations \
  --dimensions Name=FunctionName,Value=SkylineContactStack-ContactFunction \
  --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 300 \
  --statistics Sum
```

### 6.2 Configurar alertas (opcional)
1. Ve a CloudWatch en la consola de AWS
2. Crea alarmas para:
   - Errores de Lambda > 5 en 5 minutos
   - Throttling de API Gateway > 10 en 5 minutos

## 🔄 Paso 7: Actualizaciones

### Para actualizar solo el código de Lambda:
```bash
cd backend
npm run build
npm run deploy:contact
```

### Para actualizar la infraestructura:
```bash
cd backend
./deploy-contact.sh
```

## ✅ Checklist Final

- [ ] SES configurado y email verificado
- [ ] Stack desplegado exitosamente
- [ ] Frontend configurado con la URL correcta
- [ ] Pruebas exitosas del API y formulario
- [ ] Emails llegando correctamente
- [ ] Monitoreo configurado

## 🆘 Soporte

Si encuentras problemas:

1. **Revisar logs:**
   ```bash
   # Lambda logs
   aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/SkylineContactStack"
   
   # API Gateway logs (si están habilitados)
   aws logs describe-log-groups --log-group-name-prefix "API-Gateway-Execution-Logs"
   ```

2. **Verificar recursos:**
   ```bash
   # Estado del stack
   aws cloudformation describe-stacks --stack-name SkylineContactStack
   
   # Estado de SES
   aws sesv2 list-email-identities
   ```

3. **Debugging del frontend:**
   - Abre las DevTools del navegador
   - Ve a la pestaña Network
   - Intenta enviar el formulario
   - Revisa la respuesta del API

## 🎉 ¡Listo!

Tu servicio de contacto ya está funcionando. Los usuarios pueden:
- Llenar el formulario en tu sitio web
- Recibir una confirmación automática
- Tu equipo recibe los mensajes en el email configurado

Para más detalles técnicos, consulta `CONTACT-SERVICE.md`.
