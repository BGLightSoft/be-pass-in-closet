import { Global, Module } from '@nestjs/common';
import { MailConfigurationService } from './mail/configuration/mail-configuration.service';
@Global()
@Module({
  imports: [],
  providers: [MailConfigurationService],
  exports: [MailConfigurationService],
})
export class InfrastructureNotificationModule { }
