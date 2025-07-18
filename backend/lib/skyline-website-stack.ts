import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';
import { SKYLINE_CONFIG } from './config';

export interface SkylineWebsiteStackProps extends cdk.StackProps {
  hostedZone?: route53.IHostedZone;
}

export class SkylineWebsiteStack extends cdk.Stack {
  public readonly distribution: cloudfront.Distribution;
  public readonly websiteBucket: s3.Bucket;
  public readonly certificate?: acm.Certificate;

  constructor(scope: Construct, id: string, props?: SkylineWebsiteStackProps) {
    super(scope, id, props);

    // Aplicar tags al stack
    Object.entries(SKYLINE_CONFIG.tags).forEach(([key, value]) => {
      cdk.Tags.of(this).add(key, value);
    });

    const domainName = SKYLINE_CONFIG.domain.domainName;
    const subdomain = SKYLINE_CONFIG.domain.subdomain;

    // Crear certificado SSL si se proporciona una Hosted Zone
    if (props?.hostedZone && domainName) {
      this.certificate = new acm.Certificate(this, 'SkylineCertificate', {
        domainName: domainName,
        subjectAlternativeNames: [subdomain, `*.${domainName}`],
        validation: acm.CertificateValidation.fromDns(props.hostedZone),
      });
    }

    // S3 Bucket para hospedar el sitio web estático
    this.websiteBucket = new s3.Bucket(this, 'SkylineWebsiteBucket', {
      bucketName: `${SKYLINE_CONFIG.bucketName}-${cdk.Stack.of(this).account}-${cdk.Stack.of(this).region}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html', // Para SPA routing
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Solo para desarrollo
      autoDeleteObjects: true, // Solo para desarrollo
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          maxAge: 3600,
        },
      ],
      enforceSSL: SKYLINE_CONFIG.security.enforceSSL,
    });

    // Comportamientos de cache para diferentes tipos de archivo
    const staticFilesBehavior: cloudfront.BehaviorOptions = {
      origin: new origins.S3Origin(this.websiteBucket),
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
      cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
      compress: true,
      cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
    };

    // Configuración de CloudFront Distribution
    let distributionProps: cloudfront.DistributionProps = {
      defaultBehavior: staticFilesBehavior,
      additionalBehaviors: {
        '/assets/*': {
          ...staticFilesBehavior,
          cachePolicy: new cloudfront.CachePolicy(this, 'LongCachePolicy', {
            cachePolicyName: 'SkylineLongCache',
            comment: 'Long cache for static assets',
            defaultTtl: cdk.Duration.days(30),
            maxTtl: cdk.Duration.days(365),
            minTtl: cdk.Duration.seconds(0),
          }),
        },
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(30),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(30),
        },
      ],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      enabled: true,
      comment: SKYLINE_CONFIG.cloudFront.comment,
      enableIpv6: SKYLINE_CONFIG.cloudFront.enableIPv6,
    };

    // Agregar configuración de dominio y certificado si están disponibles
    if (this.certificate && domainName) {
      distributionProps = {
        ...distributionProps,
        domainNames: [
          domainName,
          subdomain,
        ],
        certificate: this.certificate,
      };
    }

    // Distribución de CloudFront
    this.distribution = new cloudfront.Distribution(this, 'SkylineWebsiteDistribution', distributionProps);

    // Deployment del sitio web
    const deployment = new s3deploy.BucketDeployment(this, 'SkylineWebsiteDeployment', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: this.websiteBucket,
      distribution: this.distribution,
      distributionPaths: ['/*'],
      prune: true,
      retainOnDelete: false,
      memoryLimit: 1024,
    });

    // Crear registros DNS si se proporciona una Hosted Zone
    if (props?.hostedZone && domainName) {
      // Crear registro A para el dominio principal (skylineit.mx)
      new route53.ARecord(this, 'SkylineARecord', {
        zone: props.hostedZone,
        recordName: domainName,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(this.distribution)
        ),
        comment: `A Record para ${domainName}`,
      });

      // Crear registro A para el subdominio www
      new route53.ARecord(this, 'SkylineWwwARecord', {
        zone: props.hostedZone,
        recordName: 'www',
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(this.distribution)
        ),
        comment: `A Record para www.${domainName}`,
      });

      // Crear registro AAAA para IPv6 (opcional)
      new route53.AaaaRecord(this, 'SkylineAAAARecord', {
        zone: props.hostedZone,
        recordName: domainName,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(this.distribution)
        ),
        comment: `AAAA Record para ${domainName}`,
      });

      new route53.AaaaRecord(this, 'SkylineWwwAAAARecord', {
        zone: props.hostedZone,
        recordName: 'www',
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(this.distribution)
        ),
        comment: `AAAA Record para www.${domainName}`,
      });
    }

    // Outputs
    new cdk.CfnOutput(this, 'BucketName', {
      value: this.websiteBucket.bucketName,
      description: 'Name of the S3 bucket',
    });

    new cdk.CfnOutput(this, 'BucketWebsiteURL', {
      value: this.websiteBucket.bucketWebsiteUrl,
      description: 'URL of the S3 bucket website',
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: this.distribution.distributionId,
      description: 'CloudFront Distribution ID',
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: this.distribution.distributionDomainName,
      description: 'CloudFront Distribution Domain Name',
    });

    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: `https://${this.distribution.distributionDomainName}`,
      description: 'Website URL',
    });

    new cdk.CfnOutput(this, 'DeploymentCommand', {
      value: `aws s3 sync dist/ s3://${this.websiteBucket.bucketName}/ --delete && aws cloudfront create-invalidation --distribution-id ${this.distribution.distributionId} --paths "/*"`,
      description: 'Command to manually update the website',
    });

    // Outputs específicos para dominio personalizado
    if (this.certificate && domainName) {
      new cdk.CfnOutput(this, 'CustomDomainURL', {
        value: `https://${domainName}`,
        description: 'Custom Domain URL',
      });

      new cdk.CfnOutput(this, 'WwwDomainURL', {
        value: `https://${subdomain}`,
        description: 'WWW Domain URL',
      });

      new cdk.CfnOutput(this, 'CertificateArn', {
        value: this.certificate.certificateArn,
        description: 'ARN del certificado SSL',
      });
    }
  }
}
