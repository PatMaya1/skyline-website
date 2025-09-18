# Servicio de Contacto Skyline

Este servicio implementa un formulario de contacto funcional usando AWS Lambda, AWS SES y AWS API Gateway, desplegado con AWS CDK.

## 🏗️ Arquitectura

```
Frontend (React) → API Gateway → Lambda Function → AWS SES → Email
```

### Componentes

1. **Lambda Function** (`backend/lambda/contact-handler.js`)
   - Procesa las solicitudes del formulario
   - Valida los datos de entrada
   - Envía emails usando SES
   - Maneja CORS y errores

2. **CDK Stack** (`backend/lib/skyline-contact-stack.ts`)
   - Define la infraestructura como código
   - Configura Lambda, API Gateway y SES
   - Establece permisos y políticas IAM

3. **React Hook** (`src/hooks/useContactForm.js`)
   - Maneja el estado del formulario
   - Realiza las llamadas al API
   - Gestiona loading y errores

## 🚀 Despliegue

### Prerrequisitos

1. **AWS CLI configurado** con las credenciales apropiadas
2. **Node.js 18+** instalado
3. **AWS CDK** instalado globalmente: `npm install -g aws-cdk`

### Pasos de despliegue

1. **Instalar dependencias del backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar el dominio de email en SES:**
   - Ve a la consola de AWS SES
   - Verifica tu dominio o email de envío
   - Asegúrate de estar fuera del sandbox de SES

3. **Desplegar el stack:**
   ```bash
   cd backend
   ./deploy-contact.sh
   ```

4. **Actualizar la URL del API en el frontend:**
   - Copia la URL del API de los outputs del CDK
   - Actualiza el archivo `.env` con la URL correcta

## 📧 Configuración de SES

### Verificación de Email/Dominio

1. **Para uso en sandbox (desarrollo):**
   - Verifica solo el email `contacto@skyline-consulting.com`
   - Solo puedes enviar a emails verificados

2. **Para producción:**
   - Solicita salir del sandbox de SES
   - Verifica tu dominio completo
   - Configura DKIM y SPF records

### Variables de Entorno

El stack usa estas variables (configurables en `backend/bin/skyline-website.ts`):

```typescript
{
  domainName: 'skyline-consulting.com',
  fromEmail: 'contacto@skyline-consulting.com',
  toEmail: 'contacto@skyline-consulting.com',
}
```

## 🔧 Configuración del Frontend

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_CONTACT_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/contact
```

### Uso del Hook

```jsx
import { useContactForm } from '../hooks/useContactForm';

const MyComponent = () => {
  const { submitForm, isLoading, isSuccess, error } = useContactForm();
  
  const handleSubmit = async (formData) => {
    try {
      await submitForm(formData);
      // Manejar éxito
    } catch (err) {
      // Manejar error
    }
  };
};
```

## 🧪 Testing

### Probar el endpoint manualmente

```bash
curl -X POST https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "empresa": "Test Company",
    "email": "test@example.com",
    "mensaje": "Este es un mensaje de prueba"
  }'
```

### Respuesta esperada

```json
{
  "success": true,
  "message": "Mensaje enviado correctamente. Te contactaremos pronto.",
  "messageId": "0000014a-f4d4-4f45-9bb7-example"
}
```

## 📊 Monitoreo

### Logs de Lambda

```bash
aws logs tail /aws/lambda/SkylineContactStack-ContactFunction --follow
```

### Métricas en CloudWatch

- Invocaciones de Lambda
- Errores de Lambda
- Duración de ejecución
- Throttling del API Gateway

## 🔒 Seguridad

### Medidas implementadas

1. **CORS** configurado para dominios específicos
2. **Rate limiting** en API Gateway (50 req/min, 100 burst)
3. **Validación** de entrada en Lambda
4. **Sanitización** de datos antes del envío
5. **IAM roles** con permisos mínimos necesarios

### Consideraciones adicionales

- Implementar honeypot fields para detectar bots
- Agregar reCAPTCHA para mayor protección
- Configurar alertas de CloudWatch para errores

## 🛠️ Troubleshooting

### Errores comunes

1. **"Email address not verified"**
   - Verifica tu email en la consola de SES
   - Espera a que el dominio esté completamente verificado

2. **"CORS error"**
   - Verifica que el origen esté permitido en la configuración de CORS
   - Asegúrate de que las headers estén correctamente configuradas

3. **"403 Forbidden"**
   - Verifica los permisos IAM de la función Lambda
   - Revisa que SES tenga los permisos necesarios

### Logs útiles

```bash
# Ver logs de la función Lambda
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/SkylineContactStack"

# Ver métricas del API Gateway
aws cloudwatch get-metric-statistics \
  --namespace AWS/ApiGateway \
  --metric-name Count \
  --dimensions Name=ApiName,Value="Skyline Contact Service" \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-02T00:00:00Z \
  --period 3600 \
  --statistics Sum
```

## 📝 Scripts Disponibles

En el directorio `backend/`:

- `npm run deploy:contact` - Despliega solo el stack de contacto
- `npm run synth:contact` - Genera el template de CloudFormation
- `npm run diff:contact` - Muestra las diferencias antes del despliegue
- `npm run outputs:contact` - Muestra los outputs del stack
- `./deploy-contact.sh` - Script completo de despliegue

## 🔄 Actualizaciones

Para actualizar el servicio:

1. Modifica el código necesario
2. Ejecuta las pruebas
3. Despliega con `./deploy-contact.sh`
4. Verifica que todo funcione correctamente

## 📞 Soporte

Para soporte técnico:
- Revisa los logs de CloudWatch
- Consulta la documentación de AWS SES
- Verifica la configuración de DNS del dominio
