import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FindAccountTokenQueryService } from 'src/application/services/account/query/find-account-tokens.query.service';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { Request } from 'express';
import { AccountTokenModel } from 'src/domain/models/account/account-token.model';
import { IRefreshTokenPayload } from 'src/domain/tokens/refresh-token-payload.interface';
import { TokenUtils } from 'src/application/utils/token/token.utils';
import { JwtTokenService } from 'src/application/services/jwt/jwt-token.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  AccountTokenTypeEnum.REFRESH_TOKEN,
) {
  constructor(
    private readonly findAccountTokenQueryService: FindAccountTokenQueryService,
    private readonly jwtTokenService: JwtTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IRefreshTokenPayload) {
    const token = TokenUtils.ExtractBearerToken(req.headers.authorization);

    if (!token) {
      throw new BadRequestException('Access token not found in header');
    }

    await this.jwtTokenService.verifyRefreshToken(token);

    const accountAccessToken: AccountTokenModel | null =
      await this.findAccountTokenQueryService.execute(
        payload.accountId,
        AccountTokenTypeEnum.REFRESH_TOKEN,
        token,
      );

    if (!accountAccessToken) {
      throw new BadRequestException('Access token is invalid or revoked');
    }

    return payload;
  }
}
