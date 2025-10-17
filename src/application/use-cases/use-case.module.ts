import { Module } from '@nestjs/common';
import { AuthUseCaseModule } from './auth/auth.use-case.module';
import { AccountUseCaseModule } from './account/account.use-case.module';
import { WorkspaceUseCaseModule } from './workspace/workspace.use-case.module';

@Module({
  imports: [AuthUseCaseModule, AccountUseCaseModule, WorkspaceUseCaseModule],
  exports: [AuthUseCaseModule, AccountUseCaseModule, WorkspaceUseCaseModule],
})
export class UseCaseModule {}
