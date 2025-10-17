import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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

@ApiTags('Authentication')
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

  @ApiOperation({ summary: 'Register a new user account' })
  @ApiOkResponse({
    description:
      'User registered successfully, verification code sent to email',
    type: SignUpCommandResponseDto,
  })
  @SkipAuth()
  @Post('sign-up')
  async signup(
    @Body() body: SignUpCommandRequestDto,
  ): Promise<SignUpCommandResponseDto> {
    return this.signUpCommandUseCase.execute(body);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({
    description: 'User logged in successfully, returns account info and tokens',
    type: LogInCommandResponseDto,
  })
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

  @ApiOperation({ summary: 'Verify user account with OTP code' })
  @ApiOkResponse({
    description: 'Account verified successfully',
    type: SignUpVerifiedCommandResponseDto,
  })
  @SkipAuth()
  @UseGuards(SignUpVerifiedTokenGuard)
  @Post('sign-up-verified')
  async signUpVerified(
    @GetTokenFromHeader() token: string,
    @Body() body: SignUpVerifiedCommandRequestDto,
  ): Promise<SignUpVerifiedCommandResponseDto> {
    return this.signUpVerifiedCommandUseCase.execute(body, token);
  }

  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiOkResponse({
    description: 'New access and refresh tokens generated successfully',
    type: RefreshTokenCommandResponseDto,
  })
  @SkipAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(
    @GetTokenFromHeader() token: string,
  ): Promise<RefreshTokenCommandResponseDto> {
    return this.refreshTokenCommandUseCase.execute(token);
  }

  @ApiOperation({ summary: 'Request password reset' })
  @ApiOkResponse({
    description: 'Password reset code sent to email',
    type: ForgotPasswordCommandResponseDto,
  })
  @SkipAuth()
  @Post('forgot-password')
  async forgotPassword(
    @Body() body: ForgotPasswordCommandRequestDto,
  ): Promise<ForgotPasswordCommandResponseDto> {
    return this.forgotPasswordCommandUseCase.execute(body);
  }

  @ApiOperation({ summary: 'Reset password with OTP code' })
  @ApiOkResponse({
    description: 'Password reset successfully',
    type: UpdateForgotPasswordCommandResponseDto,
  })
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
