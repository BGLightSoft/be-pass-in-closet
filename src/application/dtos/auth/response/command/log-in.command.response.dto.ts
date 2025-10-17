import { ApiProperty } from '@nestjs/swagger';
import { AccountModel } from 'src/domain/models/account/account.model';

export class LogInCommandResponseDto {
  @ApiProperty({ description: 'Account information' })
  account: {
    id: string;
    email: string;
    isActive: boolean;
    isFrozen: boolean;
    createdAt: Date;
    updatedAt: Date;
    accountParameters?: any[];
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
      accountParameters: accountModel.accountParameters,
    };
    this.authTokens = authTokens;
  }
}
