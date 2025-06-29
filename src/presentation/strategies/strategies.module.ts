import { Global, Module } from '@nestjs/common';
import { AccessTokenStrategy } from './auth/access-token.strategies';
import { RefreshTokenStrategy } from './auth/refresh-token.strategies';
import { SignUpVerifiedTokenStrategy } from './auth/sign-up-verified-token.strategies';
import { ForgotPasswrodTokenStrategy } from './auth/forgot-password-token.strategies';

@Global()
@Module({
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    SignUpVerifiedTokenStrategy,
    ForgotPasswrodTokenStrategy,
  ],
  exports: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    SignUpVerifiedTokenStrategy,
    ForgotPasswrodTokenStrategy,
  ],
})
export class StrategiesModule {}
