import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CredentialParameterModel } from 'src/domain/models/credential/credential-parameter.model';
import { ICredentialParameterRepository } from 'src/domain/repositories/credential/credential-parameter.repository.interface';
import { CredentialParameters } from 'src/infrastructure/database/postgres/entities/CredentialParameters';
import { CredentialParameterMapper } from 'src/infrastructure/mappers/credential/credential-parameter.mapper';
import { BaseRepository } from '../base/base-repository';

@Injectable()
export class CredentialParameterRepository
  extends BaseRepository<CredentialParameters, CredentialParameterModel>
  implements ICredentialParameterRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, CredentialParameters, new CredentialParameterMapper());
  }

  async findByCredentialId(
    credentialId: string,
  ): Promise<CredentialParameterModel[]> {
    const entities = await this.repository.findBy({ credentialId });
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async updateCredentialIndexes(
    credentialGroupId: string,
    credentialIndexes: Array<{ credentialId: string; index: number }>,
  ): Promise<void> {
    if (credentialIndexes.length === 0) return;

    // Update index parameters for each credential
    for (const { credentialId, index } of credentialIndexes) {
      await this.repository.query(
        `
        UPDATE credential_parameters 
        SET data = jsonb_set(data, '{value}', $1::jsonb),
            updated_at = NOW()
        WHERE credential_id = $2 
          AND name = 'index'
          AND deleted_at IS NULL
        `,
        [`"${index}"`, credentialId],
      );
    }
  }
}
