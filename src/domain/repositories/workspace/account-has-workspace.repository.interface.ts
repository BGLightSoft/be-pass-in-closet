import { AccountHasWorkspaceModel } from 'src/domain/models/workspace/account-has-workspace.model';
import { IBaseRepository } from '../base.repository.interface';
import { AccountHasWorkspaces } from 'src/infrastructure/database/postgres/entities/AccountHasWorkspaces';

export interface IAccountHasWorkspaceRepository
  extends IBaseRepository<AccountHasWorkspaces, AccountHasWorkspaceModel> {
  findByAccountId(accountId: string): Promise<AccountHasWorkspaceModel[]>;
  findByWorkspaceId(workspaceId: string): Promise<AccountHasWorkspaceModel[]>;
  findByAccountIdAndWorkspaceId(
    accountId: string,
    workspaceId: string,
  ): Promise<AccountHasWorkspaceModel | null>;
}

export const IAccountHasWorkspaceRepository = Symbol(
  'IAccountHasWorkspaceRepository',
);
