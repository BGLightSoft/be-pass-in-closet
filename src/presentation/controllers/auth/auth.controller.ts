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
import { LogInCommandRequestDto } from 'src/application/dtos/auth/request/command/log-in.command.request.dto';
import { LogInCommandResponseDto } from 'src/application/dtos/auth/response/command/log-in.command.response.dto';
import { SignUpCommandRequestDto } from 'src/application/dtos/auth/request/command/sign-up.command.request.dto';
import { SignUpCommandResponseDto } from 'src/application/dtos/auth/response/command/sign-up.command.response.dto';
import { SignUpVerifiedCommandRequestDto } from 'src/application/dtos/auth/request/command/sign-up-verified.command.request.dto';
import { SignUpVerifiedCommandResponseDto } from 'src/application/dtos/auth/response/command/sign-up-verified.command.response.dto';
import { RefreshTokenCommandResponseDto } from 'src/application/dtos/auth/response/command/refresh-token.command.response.dto';
import { ForgotPasswordCommandRequestDto } from 'src/application/dtos/auth/request/command/forgot-password.command.request.dto';
import { ForgotPasswordCommandResponseDto } from 'src/application/dtos/auth/response/command/forgot-password.command.response.dto';
import { UpdateForgotPasswordCommandRequestDto } from 'src/application/dtos/auth/response/command/update-forgot-password.command.request.dto';
import { UpdateForgotPasswordCommandResponseDto } from 'src/application/dtos/auth/response/command/update-forgot-password.command.response.dto';
import { LogInCommandUseCase } from 'src/application/use-cases/auth/command/log-in.command.use-case';
import { RefreshTokenCommandUseCase } from 'src/application/use-cases/auth/command/refresh-token.command.use-case';
import { SignUpCommandUseCase } from 'src/application/use-cases/auth/command/sign-up.command.use-case';
import { SignUpVerifiedCommandUseCase } from 'src/application/use-cases/auth/command/sign-up-verified.command.use-case';
import { ForgotPasswordCommandUseCase } from 'src/application/use-cases/auth/command/forgot-password.command.use-case';
import { UpdateForgotPasswordCommandUseCase } from 'src/application/use-cases/auth/command/update-forgot-password.command.use-case';
import { SkipAuth } from 'src/presentation/decorators/skip-auth.decorator';
import { AccountFrozenGuard } from 'src/presentation/quards/account/account-frozen.guard';
import { AccountRegisteredStatusGuard } from 'src/presentation/quards/account/account-registered-status.guard';
import { AccountVerificationGuard } from 'src/presentation/quards/account/account-verification.guard';
import { RefreshTokenGuard } from 'src/presentation/quards/auth/refresh-token.guard';
import { SignUpVerifiedTokenGuard } from 'src/presentation/quards/auth/sign-up-verified-token.guard';
import { ForgotPasswordTokenGuard } from 'src/presentation/quards/auth/forgot-password-token.guard';
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
  async signup(
    @Body() body: SignUpCommandRequestDto,
  ): Promise<SignUpCommandResponseDto> {
    return this.signUpCommandUseCase.execute(body);
  }

  @SkipAuth()
  @UseGuards(
    AccountRegisteredStatusGuard,
    AccountVerificationGuard,
    AccountFrozenGuard,
  )
  @Post('log-in')
  async login(
    @Body() body: LogInCommandRequestDto,
  ): Promise<LogInCommandResponseDto> {
    return this.logInCommandUseCase.execute(body);
  }

  @SkipAuth()
  @UseGuards(SignUpVerifiedTokenGuard)
  @Post('sign-up-verified')
  async signUpVerified(
    @GetTokenFromHeader() token: string,
    @Body() body: SignUpVerifiedCommandRequestDto,
  ): Promise<SignUpVerifiedCommandResponseDto> {
    return this.signUpVerifiedCommandUseCase.execute(body, token);
  }

  @SkipAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(
    @GetTokenFromHeader() token: string,
  ): Promise<RefreshTokenCommandResponseDto> {
    return this.refreshTokenCommandUseCase.execute(token);
  }

  @SkipAuth()
  @Post('forgot-password')
  async forgotPassword(
    @Body() body: ForgotPasswordCommandRequestDto,
  ): Promise<ForgotPasswordCommandResponseDto> {
    return this.forgotPasswordCommandUseCase.execute(body);
  }

  @SkipAuth()
  @UseGuards(ForgotPasswordTokenGuard)
  @Put('forgot-password')
  async updateForgotPassword(
    @GetTokenFromHeader() token: string,
    @Body() body: UpdateForgotPasswordCommandRequestDto,
  ): Promise<UpdateForgotPasswordCommandResponseDto> {
    return this.updateForgotPasswordCommandUseCase.execute(body, token);
  }
}
