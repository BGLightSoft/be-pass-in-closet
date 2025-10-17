import { IMapper } from 'src/domain/mapper/mapper.interface';
import { CredentialParameterListModel } from 'src/domain/models/credential/credential-parameter-list.model';
import { CredentialParameterList } from '../../database/postgres/entities/CredentialParameterList';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CredentialParameterListMapper
  implements IMapper<CredentialParameterList, CredentialParameterListModel>
{
  toDomain(entity: CredentialParameterList): CredentialParameterListModel {
    return new CredentialParameterListModel({
      id: entity.id,
      credentialGroupTypeId: entity.credentialGroupTypeId,
      name: entity.name,
      data: entity.data,
      isActive: entity.isActive === true,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt) : new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    });
  }

  toEntity(domain: CredentialParameterListModel): CredentialParameterList {
    const entity = new CredentialParameterList();
    entity.credentialGroupTypeId = domain.credentialGroupTypeId;
    entity.name = domain.name;
    entity.data = domain.data;
    entity.isActive = domain.isActive ? true : false;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}
