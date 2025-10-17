import { Module } from '@nestjs/common';
import { AuthUseCaseModule } from './auth/auth.use-case.module';
import { AccountUseCaseModule } from './account/account.use-case.module';
import { WorkspaceUseCaseModule } from './workspace/workspace.use-case.module';
import { CredentialGroupUseCaseModule } from './credential-group/credential-group.use-case.module';

@Module({
  imports: [
    AuthUseCaseModule,
    AccountUseCaseModule,
    WorkspaceUseCaseModule,
    CredentialGroupUseCaseModule,
  ],
  exports: [
    AuthUseCaseModule,
    AccountUseCaseModule,
    WorkspaceUseCaseModule,
    CredentialGroupUseCaseModule,
  ],
})
export class UseCaseModule {}
