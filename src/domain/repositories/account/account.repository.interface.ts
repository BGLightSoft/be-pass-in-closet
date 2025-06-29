import { AccountModel } from 'src/domain/models/account/account.model';
import { IBaseRepository } from '../base.repository.interface';
import { Accounts } from 'src/infrastructure/database/postgres/entities/Accounts';
export interface IAccountRepository
  extends IBaseRepository<Accounts, AccountModel> {
  findByEmail(email: string): Promise<AccountModel | null>;
}

export const IAccountRepository = Symbol('IAccountRepository');
