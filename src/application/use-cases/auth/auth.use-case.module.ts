import { Module } from '@nestjs/common';
import { SignUpCommandUseCase } from './command/sign-up.command.use-case';
import { LogInCommandUseCase } from './command/log-in.command.use-case';
import { RefreshTokenCommandUseCase } from './command/refresh-token.command.use-case';
import { JwtModule } from '@nestjs/jwt';
import { SignUpVerifiedCommandUseCase } from './command/sign-up-verified.command.use-case';
import { ForgotPasswordCommandUseCase } from './command/forgot-password.command.use-case';
import { UpdateForgotPasswordCommandUseCase } from './command/update-forgot-password.command.use-case';
const command = [
  SignUpCommandUseCase,
  LogInCommandUseCase,
  RefreshTokenCommandUseCase,
  SignUpVerifiedCommandUseCase,
  ForgotPasswordCommandUseCase,
  UpdateForgotPasswordCommandUseCase,
];
@Module({
  imports: [JwtModule],
  providers: [...command],
  exports: [...command],
})
export class AuthUseCaseModule {}
