import { IMapper } from 'src/domain/mapper/mapper.interface';
import { CredentialModel } from 'src/domain/models/credential/credential.model';
import { Credentials } from '../../database/postgres/entities/Credentials';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CredentialMapper implements IMapper<Credentials, CredentialModel> {
  toDomain(entity: Credentials): CredentialModel {
    return new CredentialModel({
      id: entity.id,
      credentialGroupId: entity.credentialGroupId,
      name: entity.name,
      isActive: entity.isActive === true,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt) : new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    });
  }

  toEntity(domain: CredentialModel): Credentials {
    const entity = new Credentials();
    entity.credentialGroupId = domain.credentialGroupId;
    entity.name = domain.name;
    entity.isActive = domain.isActive ? true : false;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}
