import { AccountParameterModel } from 'src/domain/models/account/account-parameter.model';
import { AccountParameters } from 'src/infrastructure/database/postgres/entities/AccountParameters';
import { IBaseRepository } from '../base.repository.interface';

export interface IAccountParameterRepository
  extends IBaseRepository<AccountParameters, AccountParameterModel> {}
export const IAccountParameterRepository = Symbol(
  'IAccountParameterRepository',
);
