import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AuthController } from './auth/auth.controller';
import { WorkspaceController } from './workspace/workspace.controller';

@Module({
  controllers: [AuthController, AccountController, WorkspaceController],
})
export class ControllersModule {}
