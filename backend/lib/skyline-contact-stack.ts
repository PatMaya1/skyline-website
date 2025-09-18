import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ses from 'aws-cdk-lib/aws-ses';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config({ path: path.join(__dirname, '../.env') });

export interface SkylineContactStackProps extends cdk.StackProps {
  domainName?: string;
  fromEmail?: string;
  toEmail?: string;
}

export class SkylineContactStack extends cdk.Stack {
  public readonly apiUrl: string;
  public readonly contactFunction: lambda.Function;

  constructor(scope: Construct, id: string, props?: SkylineContactStackProps) {
    super(scope, id, props);

    // Configuración por defecto
    const domainName = props?.domainName || 'skylineit.mx';
    const fromEmail = props?.fromEmail || `contacto@${domainName}`;
    const toEmail = props?.toEmail || fromEmail;

    // Nota: Se asume que las identidades de email ya están verificadas en SES
    // Si necesitas crearlas, hazlo manualmente en la consola de AWS SES

    // Función Lambda para manejar el formulario de contacto
    this.contactFunction = new lambda.Function(this, 'ContactFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'contact-handler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      environment: {
        FROM_EMAIL: fromEmail,
        TO_EMAIL: toEmail,
        RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || '',
        // AWS_REGION está disponible automáticamente en Lambda
      },
      description: 'Lambda function to handle contact form submissions via SES',
    });

    // Permisos para enviar emails con SES
    this.contactFunction.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'ses:SendEmail',
          'ses:SendRawEmail',
        ],
        resources: [
          `arn:aws:ses:${this.region}:${this.account}:identity/${fromEmail}`,
          `arn:aws:ses:${this.region}:${this.account}:identity/${domainName}`,
          `arn:aws:ses:${this.region}:${this.account}:configuration-set/my-first-configuration-set`,
        ],
      })
    );

    // API Gateway para exponer la función Lambda
    const api = new apigateway.RestApi(this, 'ContactApi', {
      restApiName: 'Skyline Contact Service',
      description: 'API for handling contact form submissions',
      defaultCorsPreflightOptions: {
        allowOrigins: ['http://localhost:5173', 'http://localhost:3000', 'https://skylineit.mx', 'https://www.skylineit.mx'], // Específico para tu dominio
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
        ],
        allowCredentials: false,
      },
      deployOptions: {
        stageName: 'prod',
      },
    });

    // Integración Lambda
    const contactIntegration = new apigateway.LambdaIntegration(this.contactFunction, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    });

    // Recurso /contact
    const contactResource = api.root.addResource('contact');
    
    // Método POST
    contactResource.addMethod('POST', contactIntegration);
    
    // El método OPTIONS se crea automáticamente por defaultCorsPreflightOptions

    // Configurar throttling con Usage Plan
    const plan = api.addUsagePlan('ContactUsagePlan', {
      name: 'ContactFormPlan',
      throttle: {
        rateLimit: 50,
        burstLimit: 100,
      },
      quota: {
        limit: 1000,
        period: apigateway.Period.DAY,
      },
    });

    // Asociar el plan con el stage
    plan.addApiStage({
      stage: api.deploymentStage,
    });

    // Outputs
    this.apiUrl = api.url;

    new cdk.CfnOutput(this, 'ContactApiUrl', {
      value: api.url,
      description: 'URL of the Contact API',
      exportName: 'SkylineContactApiUrl',
    });

    new cdk.CfnOutput(this, 'ContactApiEndpoint', {
      value: `${api.url}contact`,
      description: 'Full endpoint URL for contact form submissions',
      exportName: 'SkylineContactEndpoint',
    });

    new cdk.CfnOutput(this, 'ContactFunctionName', {
      value: this.contactFunction.functionName,
      description: 'Name of the contact Lambda function',
      exportName: 'SkylineContactFunctionName',
    });

    new cdk.CfnOutput(this, 'ContactApiId', {
      value: api.restApiId,
      description: 'ID of the Contact API Gateway',
      exportName: 'SkylineContactApiId',
    });

    // Tags para todos los recursos
    cdk.Tags.of(this).add('Project', 'SkylineWebsite');
    cdk.Tags.of(this).add('Component', 'ContactService');
    cdk.Tags.of(this).add('Environment', 'Production');
  }
}
