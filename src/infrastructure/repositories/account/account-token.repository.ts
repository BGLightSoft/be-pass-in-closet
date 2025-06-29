import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountTokenModel } from 'src/domain/models/account/account-token.model';
import { AccountTokens } from 'src/infrastructure/database/postgres/entities/AccountTokens';
import { BaseRepository } from '../base/base-repository';
import { IAccountTokenRepository } from 'src/domain/repositories/account/account-token-repository.interface';
import { AccountTokenMapper } from 'src/infrastructure/mappers/account/account-token.mapper';

@Injectable()
export class AccountTokenRepository
  extends BaseRepository<AccountTokens, AccountTokenModel>
  implements IAccountTokenRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, AccountTokens, new AccountTokenMapper());
  }
}
