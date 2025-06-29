import { Global, Module } from '@nestjs/common';
import { AccessTokenGuard } from './auth/access-token.guard';
import { RefreshTokenGuard } from './auth/refresh-token.guard';
import { SignUpVerifiedTokenGuard } from './auth/sign-up-verified-token.guard';
import { ForgotPasswordTokenGuard } from './auth/forgot-password-token.guard';

@Global()
@Module({
  providers: [
    AccessTokenGuard,
    RefreshTokenGuard,
    SignUpVerifiedTokenGuard,
    ForgotPasswordTokenGuard,
  ],
  exports: [
    AccessTokenGuard,
    RefreshTokenGuard,
    SignUpVerifiedTokenGuard,
    ForgotPasswordTokenGuard,
  ],
})
export class GuardsModule { }
