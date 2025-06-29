import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenErrorMessagesEnum } from 'src/domain/enums/error-messages/token-error-messages.enum';
import { IJwtTokenService } from 'src/domain/services/jwt/jwt-token.service.interface';
import { IAccessTokenPayload } from 'src/domain/tokens/access-token-payload.interface';
import { IForgotPasswordtoken } from 'src/domain/tokens/forgot-password-token-payload.interface';
import { IRefreshTokenPayload } from 'src/domain/tokens/refresh-token-payload.interface';
import { ISignUpVerifiedToken } from 'src/domain/tokens/sign-up-verified-token.interface';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';

@Injectable()
export class JwtTokenService implements IJwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  public generateAccessToken(payload: IAccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '7d',
    });
  }

  public generateRefreshToken(payload: IRefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '30d',
    });
  }

  public generateSignUpVerifiedToken(payload: ISignUpVerifiedToken): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SIGN_UP_VERIFIAD_TOKEN_SECRET,
      expiresIn: process.env.JWT_SIGN_UP_VERIFIAD_TOKEN_EXPIRES_IN || '15m',
    });
  }

  public generateForgotPasswordToken(payload: IForgotPasswordtoken): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET,
      expiresIn: process.env.JWT_FORGOT_PASSWORD_TOKEN_EXPIRES_IN || '15m',
    });
  }

  public verifyAccessToken<T = any>(token: string): T {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      }) as T;
    } catch (error) {
      if (error.name == 'TokenExpiredError') {
        throw new BusinessErrorException(TokenErrorMessagesEnum.EXPIRED_TOKEN);
      }

      throw new BusinessErrorException(TokenErrorMessagesEnum.INVALID_TOKEN);
    }
  }

  public verifyRefreshToken<T = any>(token: string): T {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      }) as T;
    } catch (error) {
      if (error.name == 'TokenExpiredError') {
        throw new BusinessErrorException(TokenErrorMessagesEnum.EXPIRED_TOKEN);
      }

      throw new BusinessErrorException(TokenErrorMessagesEnum.INVALID_TOKEN);
    }
  }

  public decodeToken<T = any>(token: string): T {
    return this.jwtService.decode(token) as T;
  }
}
