import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountParameterModel } from 'src/domain/models/account/account-parameter.model';
import { IAccountParameterRepository } from 'src/domain/repositories/account/account-parameter.repository.interface';
import { AccountParameters } from 'src/infrastructure/database/postgres/entities/AccountParameters';
import { BaseRepository } from '../base/base-repository';
import { AccountParameterMapper } from 'src/infrastructure/mappers/account/acount-parameter.mapper';

@Injectable()
export class AccountParameterRepository
  extends BaseRepository<AccountParameters, AccountParameterModel>
  implements IAccountParameterRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, AccountParameters, new AccountParameterMapper());
  }
}
