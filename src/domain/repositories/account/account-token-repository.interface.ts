import { AccountTokenModel } from 'src/domain/models/account/account-token.model';
import { AccountTokens } from 'src/infrastructure/database/postgres/entities/AccountTokens';
import { IBaseRepository } from '../base.repository.interface';

export interface IAccountTokenRepository
  extends IBaseRepository<AccountTokens, AccountTokenModel> {}
export const IAccountTokenRepository = Symbol('IAccountTokenRepository');
