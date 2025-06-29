import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LogInDto } from 'src/application/dtos/auth/log-in.dto';
import { SignUpDto } from 'src/application/dtos/auth/sign-up.dto';
import { LogInCommandUseCase } from 'src/application/use-cases/auth/command/log-in.command.use-case';
import { RefreshTokenCommandUseCase } from 'src/application/use-cases/auth/command/refresh-token.command.use-case';
import { SignUpCommandUseCase } from 'src/application/use-cases/auth/command/sign-up.command.use-case';
import { TokenUtils } from 'src/application/utils/token/token.utils';
import { SkipAuth } from 'src/presentation/decorators/skip-auth.decorator';
import { AccountFrozenGuard } from 'src/presentation/quards/account/account-frozen.guard';
import { AccountRegisteredStatusGuard } from 'src/presentation/quards/account/account-registered-status.guard';
import { AccountVerificationGuard } from 'src/presentation/quards/account/account-verification.guard';
import { RefreshTokenGuard } from 'src/presentation/quards/auth/refresh-token.guard';
import { Request } from 'express';
import { SignUpVerifiedTokenGuard } from 'src/presentation/quards/auth/sign-up-verified-token.guard';
import { SignUpVerifiedCommandUseCase } from 'src/application/use-cases/auth/command/sign-up-verified.command.use-case';
import { SignUpVerifieDto } from 'src/application/dtos/auth/sign-up-verified.dto';
import { ForgotPasswordCommandUseCase } from 'src/application/use-cases/auth/command/forgot-password.command.use-case';
import { ForgotPasswordTokenGuard } from 'src/presentation/quards/auth/forgot-password-token.guard';
import { ForgotPasswordDto } from 'src/application/dtos/auth/forgot-password.dto';
import { UpdateForgotPasswordCommandUseCase } from 'src/application/use-cases/auth/command/update-forgot-password.command.use-case';
import { UpdateForgotPasswordDto } from 'src/application/dtos/auth/update-forgot-password.dto';
import { GetTokenFromHeader } from 'src/presentation/decorators/get-token-from-header.decorator';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signUpCommandUseCase: SignUpCommandUseCase,
    private readonly logInCommandUseCase: LogInCommandUseCase,
    private readonly refreshTokenCommandUseCase: RefreshTokenCommandUseCase,
    private readonly signUpVerifiedCommandUseCase: SignUpVerifiedCommandUseCase,
    private readonly forgotPasswordCommandUseCase: ForgotPasswordCommandUseCase,
    private readonly updateForgotPasswordCommandUseCase: UpdateForgotPasswordCommandUseCase,
  ) {}

  @SkipAuth()
  @Post('sign-up')
  async signup(@Body() body: SignUpDto) {
    return this.signUpCommandUseCase.execute(body);
  }

  @SkipAuth()
  @UseGuards(
    AccountRegisteredStatusGuard,
    AccountVerificationGuard,
    AccountFrozenGuard,
  )
  @Post('log-in')
  async login(@Body() body: LogInDto) {
    return this.logInCommandUseCase.execute(body);
  }

  @SkipAuth()
  @UseGuards(SignUpVerifiedTokenGuard)
  @Post('sign-up-verified')
  async signUpVerified(
    @GetTokenFromHeader() token: string,
    @Body() body: SignUpVerifieDto,
  ) {
    return this.signUpVerifiedCommandUseCase.execute(body, token);
  }

  @SkipAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(@GetTokenFromHeader() token: string) {
    return this.refreshTokenCommandUseCase.execute(token);
  }

  @SkipAuth()
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.forgotPasswordCommandUseCase.execute(body);
  }

  @SkipAuth()
  @UseGuards(ForgotPasswordTokenGuard)
  @Put('forgot-password')
  async updateForgotPassword(
    @GetTokenFromHeader() token: string,
    @Body() body: UpdateForgotPasswordDto,
  ) {
    return this.updateForgotPasswordCommandUseCase.execute(body, token);
  }
}
