import * as cdk from 'aws-cdk-lib';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';
import { SKYLINE_CONFIG } from './config';

export interface SkylineDomainStackProps extends cdk.StackProps {
  distribution: cloudfront.Distribution;
}

export class SkylineDomainStack extends cdk.Stack {
  public readonly hostedZone: route53.IHostedZone;
  public readonly certificate: acm.Certificate;

  constructor(scope: Construct, id: string, props: SkylineDomainStackProps) {
    super(scope, id, props);

    // Aplicar tags al stack
    Object.entries(SKYLINE_CONFIG.tags).forEach(([key, value]) => {
      cdk.Tags.of(this).add(key, value);
    });

    const domainName = SKYLINE_CONFIG.domain.domainName;
    const subdomain = SKYLINE_CONFIG.domain.subdomain;

    // Crear o buscar la Hosted Zone para el dominio
    this.hostedZone = new route53.HostedZone(this, 'SkylineHostedZone', {
      zoneName: domainName,
      comment: `Hosted Zone para ${domainName} - Skyline Website`,
    });

    // Crear certificado SSL para el dominio y subdominio
    // IMPORTANTE: Este certificado debe estar en us-east-1 para CloudFront
    this.certificate = new acm.Certificate(this, 'SkylineCertificate', {
      domainName: domainName,
      subjectAlternativeNames: [subdomain, `*.${domainName}`],
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
    });

    // Crear registro A para el dominio principal (skylineit.mx)
    new route53.ARecord(this, 'SkylineARecord', {
      zone: this.hostedZone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(props.distribution)
      ),
      comment: `A Record para ${domainName}`,
    });

    // Crear registro A para el subdominio www
    new route53.ARecord(this, 'SkylineWwwARecord', {
      zone: this.hostedZone,
      recordName: 'www',
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(props.distribution)
      ),
      comment: `A Record para www.${domainName}`,
    });

    // Crear registro AAAA para IPv6 (opcional)
    new route53.AaaaRecord(this, 'SkylineAAAARecord', {
      zone: this.hostedZone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(props.distribution)
      ),
      comment: `AAAA Record para ${domainName}`,
    });

    new route53.AaaaRecord(this, 'SkylineWwwAAAARecord', {
      zone: this.hostedZone,
      recordName: 'www',
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(props.distribution)
      ),
      comment: `AAAA Record para www.${domainName}`,
    });

    // Outputs importantes
    new cdk.CfnOutput(this, 'HostedZoneId', {
      value: this.hostedZone.hostedZoneId,
      description: 'ID de la Hosted Zone de Route53',
      exportName: 'SkylineHostedZoneId',
    });

    new cdk.CfnOutput(this, 'NameServers', {
      value: cdk.Fn.join(', ', this.hostedZone.hostedZoneNameServers || []),
      description: 'Servidores de nombres para configurar en tu registrador de dominio',
    });

    new cdk.CfnOutput(this, 'CertificateArn', {
      value: this.certificate.certificateArn,
      description: 'ARN del certificado SSL',
      exportName: 'SkylineCertificateArn',
    });

    new cdk.CfnOutput(this, 'DomainName', {
      value: domainName,
      description: 'Dominio principal',
    });

    new cdk.CfnOutput(this, 'SubdomainName', {
      value: subdomain,
      description: 'Subdominio www',
    });

    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: `https://${domainName}`,
      description: 'URL principal del sitio web',
    });

    new cdk.CfnOutput(this, 'WwwWebsiteURL', {
      value: `https://${subdomain}`,
      description: 'URL del sitio web con www',
    });

    // Output con instrucciones para configurar el dominio
    new cdk.CfnOutput(this, 'DomainSetupInstructions', {
      value: 'Configura los Name Servers mostrados arriba en tu registrador de dominio (donde compraste skylineit.mx)',
      description: 'Instrucciones de configuración',
    });
  }
}
