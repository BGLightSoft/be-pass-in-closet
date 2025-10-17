import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AuthController } from './auth/auth.controller';
import { WorkspaceController } from './workspace/workspace.controller';
import { CredentialGroupController } from './credential-group/credential-group.controller';
import { CredentialController } from './credential/credential.controller';
import { CredentialGroupTypeController } from './credential-group-type/credential-group-type.controller';

@Module({
  controllers: [
    AuthController,
    AccountController,
    WorkspaceController,
    CredentialGroupController,
    CredentialController,
    CredentialGroupTypeController,
  ],
})
export class ControllersModule {}
