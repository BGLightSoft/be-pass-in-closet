import { Global, Module } from '@nestjs/common';
import { AccountServiceModule } from './account/account.service.module';
import { HashServiceModule } from './hash/hash.service.module';
import { OtpServiceModule } from './otp/otp.service.module';
import { JwtTokenServiceModule } from './jwt/jwt-token.service.module';
import { AuthServiceModule } from './auth/auth.service.module';
import { AccountTokensServiceModule } from './account-tokens/account-tokens.service.module';
import { NotificationServiceModule } from './notification/notification.service.module';
import { WorkspaceServiceModule } from './workspace/workspace.service.module';
import { CredentialGroupServiceModule } from './credential-group/credential-group.service.module';
import { CredentialServiceModule } from './credential/credential.service.module';
import { CredentialGroupTypeServiceModule } from './credential-group-type/credential-group-type.service.module';

@Global()
@Module({
  imports: [
    HashServiceModule,
    OtpServiceModule,
    AccountServiceModule,
    JwtTokenServiceModule,
    AuthServiceModule,
    AccountTokensServiceModule,
    NotificationServiceModule,
    WorkspaceServiceModule,
    CredentialGroupServiceModule,
    CredentialServiceModule,
    CredentialGroupTypeServiceModule,
  ],
  exports: [
    HashServiceModule,
    OtpServiceModule,
    AccountServiceModule,
    JwtTokenServiceModule,
    AuthServiceModule,
    AccountTokensServiceModule,
    NotificationServiceModule,
    WorkspaceServiceModule,
    CredentialGroupServiceModule,
    CredentialServiceModule,
    CredentialGroupTypeServiceModule,
  ],
})
export class ServicesModule {}
