import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { IRefreshTokenPayload } from 'src/domain/tokens/refresh-token-payload.interface';
import { AccountTokenModel } from 'src/domain/models/account/account-token.model';
import { GetAccountTokenQueryService } from 'src/application/services/account-tokens/query/get-account-token.query.service';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { DeleteAuthtokensCommandService } from 'src/application/services/account-tokens/command/delete-auth-tokens.command.service';
import { CreateAuthtokensCommandService } from 'src/application/services/account-tokens/command/create-auth-tokens.command.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';

@Injectable()
export class RefreshTokenCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly getAccountTokenQueryService: GetAccountTokenQueryService,
    private readonly deleteAuthtokensCommandService: DeleteAuthtokensCommandService,
    private readonly createAuthtokensCommandService: CreateAuthtokensCommandService,
  ) {}
  public async execute(refreshToken: string | null) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (!refreshToken) {
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.TOKEN_NOT_FOUND,
        );
      }

      const refreshTokenPayload: IRefreshTokenPayload =
        this.jwtService.decode<IRefreshTokenPayload>(refreshToken);

      const { accountId, email } = refreshTokenPayload;

      const refreshTokenModel: AccountTokenModel | null =
        await this.getAccountTokenQueryService.byToken(
          accountId,
          AccountTokenTypeEnum.REFRESH_TOKEN,
          refreshToken,
        );

      if (!refreshToken || refreshToken == null) {
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.TOKEN_NOT_FOUND,
        );
      }

      const tokenableId = refreshTokenModel?.tokenableId;

      if (!tokenableId) {
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.TOKEN_NOT_FOUND,
        );
      }

      const accessTokenModel: AccountTokenModel | null =
        await this.getAccountTokenQueryService.byTokenableId(
          refreshTokenModel?.tokenableId,
        );

      if (!accessTokenModel || !accessTokenModel?.token)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.TOKEN_NOT_FOUND,
        );

      await this.deleteAuthtokensCommandService.execute(
        accountId,
        accessTokenModel?.token,
        refreshToken,
      );

      const authTokens = await this.createAuthtokensCommandService.execute(
        queryRunner,
        accountId,
        email,
      );

      await queryRunner.commitTransaction();

      return authTokens;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
