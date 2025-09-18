#!/bin/bash

# Test reCAPTCHA verification
echo "🧪 Testing reCAPTCHA verification..."

# Simular un token de prueba (esto fallará pero nos dará información)
curl -X POST "https://kb9i36e9ue.execute-api.us-east-1.amazonaws.com/prod/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "empresa": "Test Company", 
    "email": "test@example.com",
    "mensaje": "Test message",
    "captchaToken": "test-token-will-fail"
  }'

echo ""
echo "🔍 Si el error es 'CAPTCHA verification failed', el problema está en la verificación del token."
echo "🔍 Si el error es diferente, el problema está en otro lado."
