import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountModel } from 'src/domain/models/account/account.model';
import { IAccountRepository } from 'src/domain/repositories/account/account.repository.interface';
import { Accounts } from 'src/infrastructure/database/postgres/entities/Accounts';
import { AccountMapper } from 'src/infrastructure/mappers/account/account.mapper';
import { BaseRepository } from '../base/base-repository';

@Injectable()
export class AccountRepository
  extends BaseRepository<Accounts, AccountModel>
  implements IAccountRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, Accounts, new AccountMapper());
  }

  async findByEmail(email: string): Promise<AccountModel | null> {
    const entity = await this.repository.findOneBy({ email });
    return entity ? this.mapper.toDomain(entity) : null;
  }
}
