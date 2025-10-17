import { Module } from '@nestjs/common';
import { AccountsInfrastructureRepositoriesModule } from './account/accounts.infrastructure.repositories.module';
import { LogsInfrastructureRepositoriesModule } from './logs/logs.infrastructure.repositories.module';
import { OtpInfrastructureRepositoriesModule } from './otp/otp.infrastructure.repositories.module';
import { WorkspaceInfrastructureRepositoriesModule } from './workspace/workspace.infrastructure.repositories.module';
import { CredentialInfrastructureRepositoriesModule } from './credential/credential.infrastructure.repositories.module';

@Module({
  imports: [
    AccountsInfrastructureRepositoriesModule,
    LogsInfrastructureRepositoriesModule,
    OtpInfrastructureRepositoriesModule,
    WorkspaceInfrastructureRepositoriesModule,
    CredentialInfrastructureRepositoriesModule,
  ],
  exports: [
    AccountsInfrastructureRepositoriesModule,
    LogsInfrastructureRepositoriesModule,
    OtpInfrastructureRepositoriesModule,
    WorkspaceInfrastructureRepositoriesModule,
    CredentialInfrastructureRepositoriesModule,
  ],
})
export class InfrastructureRepositoriesModule {}
