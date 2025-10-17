import { IMapper } from 'src/domain/mapper/mapper.interface';
import { AccountHasWorkspaceModel } from 'src/domain/models/workspace/account-has-workspace.model';
import { AccountHasWorkspaces } from '../../database/postgres/entities/AccountHasWorkspaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountHasWorkspaceMapper
  implements IMapper<AccountHasWorkspaces, AccountHasWorkspaceModel>
{
  toDomain(entity: AccountHasWorkspaces): AccountHasWorkspaceModel {
    return new AccountHasWorkspaceModel({
      id: entity.id,
      accountId: entity.accountId,
      workspaceId: entity.workspaceId,
      isDefault: entity.isDefault === true,
      isActive: entity.isActive === true,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt) : new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    });
  }

  toEntity(domain: AccountHasWorkspaceModel): AccountHasWorkspaces {
    const entity = new AccountHasWorkspaces();
    entity.accountId = domain.accountId;
    entity.workspaceId = domain.workspaceId;
    entity.isDefault = domain.isDefault ? true : false;
    entity.isActive = domain.isActive ? true : false;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}
