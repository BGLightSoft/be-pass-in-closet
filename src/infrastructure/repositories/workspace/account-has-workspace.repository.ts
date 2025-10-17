import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountHasWorkspaceModel } from 'src/domain/models/workspace/account-has-workspace.model';
import { IAccountHasWorkspaceRepository } from 'src/domain/repositories/workspace/account-has-workspace.repository.interface';
import { AccountHasWorkspaces } from 'src/infrastructure/database/postgres/entities/AccountHasWorkspaces';
import { AccountHasWorkspaceMapper } from 'src/infrastructure/mappers/workspace/account-has-workspace.mapper';
import { BaseRepository } from '../base/base-repository';

@Injectable()
export class AccountHasWorkspaceRepository
  extends BaseRepository<AccountHasWorkspaces, AccountHasWorkspaceModel>
  implements IAccountHasWorkspaceRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, AccountHasWorkspaces, new AccountHasWorkspaceMapper());
  }

  async findByAccountId(
    accountId: string,
  ): Promise<AccountHasWorkspaceModel[]> {
    const entities = await this.repository.findBy({ accountId });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findByWorkspaceId(
    workspaceId: string,
  ): Promise<AccountHasWorkspaceModel[]> {
    const entities = await this.repository.findBy({ workspaceId });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findByAccountIdAndWorkspaceId(
    accountId: string,
    workspaceId: string,
  ): Promise<AccountHasWorkspaceModel | null> {
    const entity = await this.repository.findOneBy({
      accountId,
      workspaceId,
    });
    return entity ? this.mapper.toDomain(entity) : null;
  }
}
