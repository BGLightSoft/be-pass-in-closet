import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  controllers: [
    AuthController,
    AccountController,
  ],
})
export class ControllersModule { }
