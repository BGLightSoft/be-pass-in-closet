import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountPhoneModel } from 'src/domain/models/account/account-phone.model';
import { IAccountPhoneRepository } from 'src/domain/repositories/account/account-phone.repository.interface';
import { AccountPhones } from 'src/infrastructure/database/postgres/entities/AccountPhones';
import { BaseRepository } from '../base/base-repository';
import { AccountPhoneMapper } from 'src/infrastructure/mappers/account/account-phone.mapper';

@Injectable()
export class AccountPhoneRepository
  extends BaseRepository<AccountPhones, AccountPhoneModel>
  implements IAccountPhoneRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, AccountPhones, new AccountPhoneMapper());
  }
}
