#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SkylineWebsiteStack } from '../lib/skyline-website-stack';
import { SkylineRoute53Stack } from '../lib/skyline-route53-stack';
import { SkylineContactStack } from '../lib/skyline-contact-stack';

const app = new cdk.App();

// Configuración del entorno
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

// Stack 1: Solo Route53 Hosted Zone
const route53Stack = new SkylineRoute53Stack(app, 'SkylineRoute53Stack', {
  env,
});

// Stack 2: Website completo con certificado SSL y registros DNS
const websiteStack = new SkylineWebsiteStack(app, 'SkylineWebsiteStack', {
  hostedZone: route53Stack.hostedZone,
  env,
});

// Stack 3: Servicio de contacto con Lambda y SES
const contactStack = new SkylineContactStack(app, 'SkylineContactStack', {
  env,
  domainName: 'skylineit.mx',
  fromEmail: 'contacto@skylineit.mx',
  toEmail: 'contacto@skylineit.mx',
});

// Establecer dependencias
websiteStack.addDependency(route53Stack);
// El stack de contacto es independiente, pero puede beneficiarse del dominio verificado
