import { IMapper } from 'src/domain/mapper/mapper.interface';
import { CredentialParameterModel } from 'src/domain/models/credential/credential-parameter.model';
import { CredentialParameters } from '../../database/postgres/entities/CredentialParameters';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CredentialParameterMapper
  implements IMapper<CredentialParameters, CredentialParameterModel>
{
  toDomain(entity: CredentialParameters): CredentialParameterModel {
    return new CredentialParameterModel({
      id: entity.id,
      credentialId: entity.credentialId,
      name: entity.name,
      data: entity.data,
      isActive: entity.isActive === true,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt) : new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    });
  }

  toEntity(domain: CredentialParameterModel): CredentialParameters {
    const entity = new CredentialParameters();
    entity.credentialId = domain.credentialId;
    entity.name = domain.name;
    entity.data = domain.data;
    entity.isActive = domain.isActive ? true : false;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}
