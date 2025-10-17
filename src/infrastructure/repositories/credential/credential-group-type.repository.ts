import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CredentialGroupTypeModel } from 'src/domain/models/credential/credential-group-type.model';
import { ICredentialGroupTypeRepository } from 'src/domain/repositories/credential/credential-group-type.repository.interface';
import { CredentialGroupTypes } from 'src/infrastructure/database/postgres/entities/CredentialGroupTypes';
import { CredentialGroupTypeMapper } from 'src/infrastructure/mappers/credential/credential-group-type.mapper';
import { BaseRepository } from '../base/base-repository';

@Injectable()
export class CredentialGroupTypeRepository
  extends BaseRepository<CredentialGroupTypes, CredentialGroupTypeModel>
  implements ICredentialGroupTypeRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, CredentialGroupTypes, new CredentialGroupTypeMapper());
  }

  async findByName(name: string): Promise<CredentialGroupTypeModel | null> {
    const entity = await this.repository.findOneBy({ name });
    return entity ? this.mapper.toDomain(entity) : null;
  }
}
