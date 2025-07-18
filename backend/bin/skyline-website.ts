#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SkylineWebsiteStack } from '../lib/skyline-website-stack';
import { SkylineRoute53Stack } from '../lib/skyline-route53-stack';

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

// Establecer dependencia
websiteStack.addDependency(route53Stack);
