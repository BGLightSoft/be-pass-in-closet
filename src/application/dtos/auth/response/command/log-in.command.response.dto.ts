import { ApiProperty } from '@nestjs/swagger';
import { AccountModel } from 'src/domain/models/account/account.model';
import { AccountParameterResponseDto } from 'src/application/dtos/account/response/account-parameter.response.dto';

export class LogInCommandResponseDto {
  @ApiProperty({ description: 'Account information' })
  account: {
    id: string;
    email: string;
    isActive: boolean;
    isFrozen: boolean;
    createdAt: Date;
    updatedAt: Date;
    accountParameters?: Record<string, any>;
  };

  @ApiProperty({ description: 'Authentication tokens' })
  authTokens: {
    accessToken: string;
    refreshToken: string;
  };

  constructor(
    accountModel: AccountModel,
    authTokens: { accessToken: string; refreshToken: string },
  ) {
    this.account = {
      id: accountModel.id!,
      email: accountModel.email,
      isActive: accountModel.isActive,
      isFrozen: accountModel.isFrozen,
      createdAt: accountModel.createdAt,
      updatedAt: accountModel.updatedAt,
      accountParameters: accountModel.accountParameters
        ? AccountParameterResponseDto.fromModels(accountModel.accountParameters)
        : undefined,
    };
    this.authTokens = authTokens;
  }
}
