import { IMapper } from 'src/domain/mapper/mapper.interface';
import { CredentialGroupTypeModel } from 'src/domain/models/credential/credential-group-type.model';
import { CredentialGroupTypes } from '../../database/postgres/entities/CredentialGroupTypes';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CredentialGroupTypeMapper
  implements IMapper<CredentialGroupTypes, CredentialGroupTypeModel>
{
  toDomain(entity: CredentialGroupTypes): CredentialGroupTypeModel {
    return new CredentialGroupTypeModel({
      id: entity.id,
      name: entity.name,
      isActive: entity.isActive === true,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt) : new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    });
  }

  toEntity(domain: CredentialGroupTypeModel): CredentialGroupTypes {
    const entity = new CredentialGroupTypes();
    entity.name = domain.name;
    entity.isActive = domain.isActive ? true : false;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}
