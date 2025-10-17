import { IMapper } from 'src/domain/mapper/mapper.interface';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';
import { CredentialGroups } from '../../database/postgres/entities/CredentialGroups';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CredentialGroupMapper
  implements IMapper<CredentialGroups, CredentialGroupModel>
{
  toDomain(entity: CredentialGroups): CredentialGroupModel {
    return new CredentialGroupModel({
      id: entity.id,
      credentialGroupTypeId: entity.credentialGroupTypeId,
      credentialGroupId: entity.credentialGroupId,
      workspaceId: entity.workspaceId,
      name: entity.name,
      isActive: entity.isActive === true,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt) : new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    });
  }

  toEntity(domain: CredentialGroupModel): CredentialGroups {
    const entity = new CredentialGroups();
    entity.credentialGroupTypeId = domain.credentialGroupTypeId;
    entity.credentialGroupId = domain.credentialGroupId;
    entity.workspaceId = domain.workspaceId;
    entity.name = domain.name;
    entity.isActive = domain.isActive ? true : false;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}
