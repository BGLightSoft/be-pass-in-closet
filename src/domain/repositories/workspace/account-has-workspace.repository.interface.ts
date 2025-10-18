import { AccountHasWorkspaceModel } from 'src/domain/models/workspace/account-has-workspace.model';
import { IBaseRepository } from '../base.repository.interface';
import { AccountHasWorkspaces } from 'src/infrastructure/database/postgres/entities/AccountHasWorkspaces';
import { QueryRunner } from 'typeorm';

export interface IAccountHasWorkspaceRepository
  extends IBaseRepository<AccountHasWorkspaces, AccountHasWorkspaceModel> {
  findByAccountId(accountId: string): Promise<AccountHasWorkspaceModel[]>;
  findByWorkspaceId(workspaceId: string): Promise<AccountHasWorkspaceModel[]>;
  findByAccountIdAndWorkspaceId(
    accountId: string,
    workspaceId: string,
  ): Promise<AccountHasWorkspaceModel | null>;
  updateDefaultStatus(
    accountId: string,
    workspaceId: string,
    isDefault: boolean,
    queryRunner?: QueryRunner,
  ): Promise<void>;
  updateDefaultStatusByAccount(
    accountId: string,
    isDefault: boolean,
    queryRunner?: QueryRunner,
  ): Promise<void>;
}

export const IAccountHasWorkspaceRepository = Symbol(
  'IAccountHasWorkspaceRepository',
);
