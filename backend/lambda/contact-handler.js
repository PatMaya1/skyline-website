const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const sesClient = new SESClient({ region: process.env.AWS_REGION });

// Configuración desde variables de entorno
const FROM_EMAIL = process.env.FROM_EMAIL || 'contacto@skylineit.mx';
const TO_EMAIL = process.env.TO_EMAIL || 'contacto@skylineit.mx';

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // Headers CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST',
  };

  // Manejo de preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    // Solo aceptamos POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }

    // Parsear el body
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    // Validar campos requeridos
    const { nombre, empresa, email, telefono, tamanoEmpresa, mensaje, captchaToken } = body;
    
    if (!nombre || !empresa || !email || !mensaje) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Missing required fields: nombre, empresa, email, mensaje' 
        }),
      };
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Validar CAPTCHA (reCAPTCHA v3)
    if (captchaToken) {
      try {
        const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
        console.log('RECAPTCHA_SECRET_KEY exists:', recaptchaSecret ? 'YES' : 'NO');
        
        if (recaptchaSecret) {
          const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${recaptchaSecret}&response=${captchaToken}`,
          });
          
          const recaptchaData = await recaptchaResponse.json();
          console.log('reCAPTCHA v3 response:', recaptchaData);
          
          if (!recaptchaData.success) {
            console.log('reCAPTCHA failed but continuing for debugging...');
            // Temporalmente no bloquear - solo logging
            // return {
            //   statusCode: 400,
            //   headers: corsHeaders,
            //   body: JSON.stringify({ error: 'CAPTCHA verification failed' }),
            // };
          } else {
            // Para reCAPTCHA v3, verificamos el score (0.0 = bot, 1.0 = humano)
            // Umbral recomendado: 0.5
            if (recaptchaData.score && recaptchaData.score < 0.3) {
              console.log('reCAPTCHA v3 score too low:', recaptchaData.score);
              // Temporalmente no bloquear por score bajo
              // return {
              //   statusCode: 400,
              //   headers: corsHeaders,
              //   body: JSON.stringify({ error: 'Request blocked due to suspicious activity' }),
              // };
            }
            
            console.log('reCAPTCHA v3 validation passed. Score:', recaptchaData.score);
          }
        }
      } catch (error) {
        console.log('CAPTCHA verification error:', error);
        // Si hay error en la verificación, continuar para debugging
        console.log('Continuing despite CAPTCHA error for debugging...');
      }
    } else {
      console.log('No CAPTCHA token provided');
    }

    // Crear el contenido del email
    const emailContent = `
    Nueva solicitud de análisis gratuito desde Skyline Website

    INFORMACIÓN DEL CONTACTO:
    ========================
    Nombre: ${nombre}
    Empresa: ${empresa}
    Email: ${email}
    Teléfono: ${telefono || 'No proporcionado'}
    Tamaño de empresa: ${tamanoEmpresa || 'No especificado'}

    MENSAJE:
    ========
    ${mensaje}

    ========================
    Enviado desde: ${event.headers?.origin || 'Desconocido'}
    Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' })}
    IP: ${event.requestContext?.identity?.sourceIp || 'Desconocida'}
    `;

    // Configurar el email
    const params = {
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [TO_EMAIL],
      },
      Message: {
        Subject: {
          Data: `Nueva solicitud de diagnostico - ${empresa}`,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: emailContent,
            Charset: 'UTF-8',
          },
          Html: {
            Data: `
            <html>
              <body style="margin: 0; padding: 0; background-color: #f3f3f3; font-family: 'Helvetica Neue', Arial, sans-serif; color: #333;">
                <div style="max-width: 600px; margin: 0 auto;">
                  <!-- Header -->
                  <div style="background-color: #000d51; padding: 32px 40px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">Skyline IT Consulting</h1>
                  </div>

                  <!-- Body -->
                  <div style="background-color: #ffffff; padding: 40px;">
                    <p style="margin: 0 0 4px; color: #000d51; opacity: 0.5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nueva solicitud</p>
                    <h2 style="margin: 0 0 24px; color: #000d51; font-size: 24px; font-weight: 600;">Diagnostico estrategico - ${empresa}</h2>

                    <!-- Contact Info -->
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f3f3f3; color: #000d51; opacity: 0.5; font-size: 14px; width: 140px;">Nombre</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f3f3f3; color: #000d51; font-size: 14px; font-weight: 500;">${nombre}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f3f3f3; color: #000d51; opacity: 0.5; font-size: 14px;">Empresa</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f3f3f3; color: #000d51; font-size: 14px; font-weight: 500;">${empresa}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f3f3f3; color: #000d51; opacity: 0.5; font-size: 14px;">Email</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f3f3f3; font-size: 14px;"><a href="mailto:${email}" style="color: #2460fd; text-decoration: none;">${email}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f3f3f3; color: #000d51; opacity: 0.5; font-size: 14px;">Telefono</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f3f3f3; color: #000d51; font-size: 14px; font-weight: 500;">${telefono || 'No proporcionado'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f3f3f3; color: #000d51; opacity: 0.5; font-size: 14px;">Tamano</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #f3f3f3; color: #000d51; font-size: 14px; font-weight: 500;">${tamanoEmpresa || 'No especificado'}</td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <div style="background-color: #f3f3f3; padding: 24px; margin-bottom: 24px;">
                      <p style="margin: 0 0 8px; color: #000d51; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</p>
                      <p style="margin: 0; color: #000d51; opacity: 0.8; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>
                    </div>

                    <!-- Technical Details -->
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #000d51; opacity: 0.4;">
                      <tr>
                        <td style="padding: 4px 0;">Origen: ${event.headers?.origin || 'Desconocido'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0;">Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' })}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0;">IP: ${event.requestContext?.identity?.sourceIp || 'Desconocida'}</td>
                      </tr>
                    </table>
                  </div>

                  <!-- Footer -->
                  <div style="padding: 24px 40px; text-align: center;">
                    <p style="margin: 0; color: #000d51; opacity: 0.3; font-size: 12px;">Skyline IT Consulting | Saltillo, Coahuila, Mexico</p>
                  </div>
                </div>
              </body>
            </html>`,
            Charset: 'UTF-8',
          },
        },
      },
    };

    // Enviar el email
    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);
    
    console.log('Email sent successfully:', result.MessageId);

    // Email de confirmación al usuario
    const confirmationParams = {
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: 'Confirmación - Tu solicitud ha sido recibida | Skyline IT',
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
            <html>
              <body style="margin: 0; padding: 0; background-color: #f3f3f3; font-family: 'Helvetica Neue', Arial, sans-serif; color: #333;">
                <div style="max-width: 600px; margin: 0 auto;">
                  <!-- Header -->
                  <div style="background-color: #000d51; padding: 32px 40px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">Skyline IT Consulting</h1>
                  </div>

                  <!-- Body -->
                  <div style="background-color: #ffffff; padding: 40px;">
                    <h2 style="margin: 0 0 16px; color: #000d51; font-size: 24px; font-weight: 600;">Hemos recibido tu solicitud, ${nombre}</h2>
                    <p style="margin: 0 0 32px; color: #000d51; opacity: 0.6; font-size: 15px; line-height: 1.6;">
                      Gracias por tu interes en Skyline IT Consulting. Tu solicitud de diagnostico estrategico para <strong style="color: #000d51; opacity: 1;">${empresa}</strong> ha sido registrada correctamente.
                    </p>

                    <!-- Next Steps -->
                    <div style="border-left: 3px solid #2460fd; padding-left: 24px; margin-bottom: 32px;">
                      <p style="margin: 0 0 16px; color: #000d51; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Proximos pasos</p>
                      <table style="border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 12px 8px 0; vertical-align: top; color: #2460fd; font-weight: 600; font-size: 14px;">1.</td>
                          <td style="padding: 8px 0; color: #000d51; opacity: 0.7; font-size: 14px;">Revisaremos tu informacion en las proximas 24 horas</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 12px 8px 0; vertical-align: top; color: #2460fd; font-weight: 600; font-size: 14px;">2.</td>
                          <td style="padding: 8px 0; color: #000d51; opacity: 0.7; font-size: 14px;">Te contactaremos para programar una videollamada inicial</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 12px 8px 0; vertical-align: top; color: #2460fd; font-weight: 600; font-size: 14px;">3.</td>
                          <td style="padding: 8px 0; color: #000d51; opacity: 0.7; font-size: 14px;">Realizaremos un analisis preliminar de tu situacion</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 12px 8px 0; vertical-align: top; color: #2460fd; font-weight: 600; font-size: 14px;">4.</td>
                          <td style="padding: 8px 0; color: #000d51; opacity: 0.7; font-size: 14px;">Te presentaremos una propuesta personalizada</td>
                        </tr>
                      </table>
                    </div>

                    <!-- Contact -->
                    <div style="background-color: #f3f3f3; padding: 24px;">
                      <p style="margin: 0 0 12px; color: #000d51; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Contacto directo</p>
                      <p style="margin: 0 0 6px; color: #000d51; opacity: 0.7; font-size: 14px;">
                        Email: <a href="mailto:contacto@skylineit.mx" style="color: #2460fd; text-decoration: none;">contacto@skylineit.mx</a>
                      </p>
                      <p style="margin: 0 0 6px; color: #000d51; opacity: 0.7; font-size: 14px;">
                        Telefono: +52 (844) 770 4939
                      </p>
                      <p style="margin: 0; color: #000d51; opacity: 0.7; font-size: 14px;">
                        Web: <a href="https://www.skylineit.mx" style="color: #2460fd; text-decoration: none;">www.skylineit.mx</a>
                      </p>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div style="padding: 24px 40px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #000d51; opacity: 0.3; font-size: 12px;">Skyline IT Consulting | Saltillo, Coahuila, Mexico</p>
                    <p style="margin: 0; color: #000d51; opacity: 0.25; font-size: 11px;">Este es un correo automatico. Por favor no respondas a este mensaje.</p>
                  </div>
                </div>
              </body>
            </html>`,
            Charset: 'UTF-8',
          },
        },
      },
    };

    const confirmationCommand = new SendEmailCommand(confirmationParams);
    await sesClient.send(confirmationCommand);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
        messageId: result.MessageId,
      }),
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Error interno del servidor. Por favor intenta más tarde.',
      }),
    };
  }
};
