import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CredentialParameterListModel } from 'src/domain/models/credential/credential-parameter-list.model';
import { ICredentialParameterListRepository } from 'src/domain/repositories/credential/credential-parameter-list.repository.interface';
import { CredentialParameterList } from 'src/infrastructure/database/postgres/entities/CredentialParameterList';
import { CredentialParameterListMapper } from 'src/infrastructure/mappers/credential/credential-parameter-list.mapper';
import { BaseRepository } from '../base/base-repository';

@Injectable()
export class CredentialParameterListRepository
  extends BaseRepository<CredentialParameterList, CredentialParameterListModel>
  implements ICredentialParameterListRepository
{
  constructor(dataSource: DataSource) {
    super(
      dataSource,
      CredentialParameterList,
      new CredentialParameterListMapper(),
    );
  }

  async findByCredentialGroupTypeId(
    credentialGroupTypeId: string,
  ): Promise<CredentialParameterListModel[]> {
    const entities = await this.repository.findBy({ credentialGroupTypeId });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }
}
