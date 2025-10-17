import { Module } from '@nestjs/common';
import { AuthUseCaseModule } from './auth/auth.use-case.module';
import { AccountUseCaseModule } from './account/account.use-case.module';
import { WorkspaceUseCaseModule } from './workspace/workspace.use-case.module';
import { CredentialGroupUseCaseModule } from './credential-group/credential-group.use-case.module';
import { CredentialUseCaseModule } from './credential/credential.use-case.module';

@Module({
  imports: [
    AuthUseCaseModule,
    AccountUseCaseModule,
    WorkspaceUseCaseModule,
    CredentialGroupUseCaseModule,
    CredentialUseCaseModule,
  ],
  exports: [
    AuthUseCaseModule,
    AccountUseCaseModule,
    WorkspaceUseCaseModule,
    CredentialGroupUseCaseModule,
    CredentialUseCaseModule,
  ],
})
export class UseCaseModule {}
