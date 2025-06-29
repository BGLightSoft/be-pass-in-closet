import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FindAccountTokenQueryService } from 'src/application/services/account/query/find-account-tokens.query.service';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { Request } from 'express';
import { AccountTokenModel } from 'src/domain/models/account/account-token.model';
import { IAccessTokenPayload } from 'src/domain/tokens/access-token-payload.interface';
import { TokenUtils } from 'src/application/utils/token/token.utils';
@Injectable()
export class ForgotPasswrodTokenStrategy extends PassportStrategy(
  Strategy,
  AccountTokenTypeEnum.FORGOT_PASSWORD_TOKEN,
) {
  constructor(
    private readonly findAccountTokenQueryService: FindAccountTokenQueryService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IAccessTokenPayload) {
    const token = TokenUtils.ExtractBearerToken(req.headers.authorization);

    if (!token) {
      throw new BadRequestException('Access token not found in header');
    }

    const accountForgotPasswordToken: AccountTokenModel | null =
      await this.findAccountTokenQueryService.execute(
        payload.accountId,
        AccountTokenTypeEnum.FORGOT_PASSWORD_TOKEN,
        token,
      );

    if (!accountForgotPasswordToken) {
      throw new BadRequestException('Access token is invalid or revoked');
    }

    return payload;
  }
}
