import { Injectable } from '@nestjs/common';
import { JwtTokenService } from 'src/application/services/jwt/jwt-token.service';
import { CreateTokenCommandService } from 'src/application/services/account-tokens/command/create-token.command.service';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';

@Injectable()
export class CreateAuthtokensCommandService {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly createTokenCommandService: CreateTokenCommandService,
  ) {}
  public async execute(queryRunner: any, accountId: string, email: string) {
    const accessToken: string = this.jwtTokenService.generateAccessToken({
      email,
      accountId,
    });

    const accountAccessTokenInDb = await this.createTokenCommandService.execute(
      queryRunner,
      accountId,
      AccountTokenTypeEnum.ACCESS_TOKEN,
      accessToken,
    );

    const refreshToken: string = this.jwtTokenService.generateRefreshToken({
      email,
      accountId,
    });

    await this.createTokenCommandService.execute(
      queryRunner,
      accountId,
      AccountTokenTypeEnum.REFRESH_TOKEN,
      refreshToken,
      accountAccessTokenInDb.id,
    );

    return { accessToken, refreshToken };
  }
}
