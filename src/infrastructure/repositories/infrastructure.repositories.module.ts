import { Module } from '@nestjs/common';
import { AccountsInfrastructureRepositoriesModule } from './account/accounts.infrastructure.repositories.module';
import { LogsInfrastructureRepositoriesModule } from './logs/logs.infrastructure.repositories.module';
import { OtpInfrastructureRepositoriesModule } from './otp/otp.infrastructure.repositories.module';

@Module({
  imports: [
    AccountsInfrastructureRepositoriesModule,
    LogsInfrastructureRepositoriesModule,
    OtpInfrastructureRepositoriesModule,
  ],
  exports: [
    AccountsInfrastructureRepositoriesModule,
    LogsInfrastructureRepositoriesModule,
    OtpInfrastructureRepositoriesModule,
  ],
})
export class InfrastructureRepositoriesModule { }
