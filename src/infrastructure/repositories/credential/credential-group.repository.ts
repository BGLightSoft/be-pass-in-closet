import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';
import { ICredentialGroupRepository } from 'src/domain/repositories/credential/credential-group.repository.interface';
import { CredentialGroups } from 'src/infrastructure/database/postgres/entities/CredentialGroups';
import { CredentialGroupMapper } from 'src/infrastructure/mappers/credential/credential-group.mapper';
import { BaseRepository } from '../base/base-repository';

@Injectable()
export class CredentialGroupRepository
  extends BaseRepository<CredentialGroups, CredentialGroupModel>
  implements ICredentialGroupRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, CredentialGroups, new CredentialGroupMapper());
  }

  async findByWorkspaceId(
    workspaceId: string,
  ): Promise<CredentialGroupModel[]> {
    const entities = await this.repository.findBy({ workspaceId });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findByCredentialGroupTypeId(
    credentialGroupTypeId: string,
  ): Promise<CredentialGroupModel[]> {
    const entities = await this.repository.findBy({ credentialGroupTypeId });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findByCredentialGroupId(
    credentialGroupId: string,
  ): Promise<CredentialGroupModel[]> {
    const entities = await this.repository.findBy({ credentialGroupId });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }
}
