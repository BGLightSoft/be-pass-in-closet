import { AccountPhoneModel } from 'src/domain/models/account/account-phone.model';
import { AccountPhones } from 'src/infrastructure/database/postgres/entities/AccountPhones';
import { IBaseRepository } from '../base.repository.interface';

export interface IAccountPhoneRepository
  extends IBaseRepository<AccountPhones, AccountPhoneModel> {}
export const IAccountPhoneRepository = Symbol('IAccountPhoneRepository');
