import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AuthController } from './auth/auth.controller';
import { WorkspaceController } from './workspace/workspace.controller';
import { CredentialGroupController } from './credential-group/credential-group.controller';
import { CredentialController } from './credential/credential.controller';

@Module({
  controllers: [
    AuthController,
    AccountController,
    WorkspaceController,
    CredentialGroupController,
    CredentialController,
  ],
})
export class ControllersModule {}
