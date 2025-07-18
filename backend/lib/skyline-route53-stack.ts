import * as cdk from 'aws-cdk-lib';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { SKYLINE_CONFIG } from './config';

export class SkylineRoute53Stack extends cdk.Stack {
  public readonly hostedZone: route53.IHostedZone;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Aplicar tags al stack
    Object.entries(SKYLINE_CONFIG.tags).forEach(([key, value]) => {
      cdk.Tags.of(this).add(key, value);
    });

    const domainName = SKYLINE_CONFIG.domain.domainName;

    // Create Route 53 Hosted Zone
    this.hostedZone = new route53.HostedZone(this, 'HostedZone', {
      zoneName: domainName,
      comment: `Hosted zone for ${domainName}`
    });

    // Output the hosted zone ID
    new cdk.CfnOutput(this, 'HostedZoneId', {
      value: this.hostedZone.hostedZoneId,
      description: 'Hosted Zone ID',
      exportName: 'SkylineHostedZoneId',
    });

    // Output the name servers using Fn.join
    new cdk.CfnOutput(this, 'NameServers', {
      value: cdk.Fn.join(',', cdk.Token.asList(this.hostedZone.hostedZoneNameServers)),
      description: 'Name servers for the hosted zone'
    });

    // Output individual name servers for easier configuration
    new cdk.CfnOutput(this, 'NameServersFormatted', {
      value: cdk.Fn.join(', ', cdk.Token.asList(this.hostedZone.hostedZoneNameServers)),
      description: 'Name servers formatted with spaces for easy copying'
    });

    // Output the domain name
    new cdk.CfnOutput(this, 'DomainName', {
      value: domainName,
      description: 'Domain name'
    });

    // Output setup instructions
    new cdk.CfnOutput(this, 'SetupInstructions', {
      value: `Configure these name servers in your domain registrar for ${domainName}`,
      description: 'Setup instructions'
    });
  }
}
