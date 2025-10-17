import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CredentialModel } from 'src/domain/models/credential/credential.model';
import { ICredentialRepository } from 'src/domain/repositories/credential/credential.repository.interface';
import { Credentials } from 'src/infrastructure/database/postgres/entities/Credentials';
import { CredentialMapper } from 'src/infrastructure/mappers/credential/credential.mapper';
import { BaseRepository } from '../base/base-repository';

@Injectable()
export class CredentialRepository
  extends BaseRepository<Credentials, CredentialModel>
  implements ICredentialRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, Credentials, new CredentialMapper());
  }

  async findByCredentialGroupId(
    credentialGroupId: string,
  ): Promise<CredentialModel[]> {
    const entities = await this.repository.findBy({ credentialGroupId });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }
}
