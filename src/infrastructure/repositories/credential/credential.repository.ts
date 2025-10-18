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

  async countByCredentialGroupIds(
    credentialGroupIds: string[],
  ): Promise<Map<string, number>> {
    if (credentialGroupIds.length === 0) {
      return new Map();
    }

    // Single query with GROUP BY to get all counts at once
    const results = await this.repository
      .createQueryBuilder('credential')
      .select('credential.credential_group_id', 'credentialGroupId')
      .addSelect('COUNT(credential.id)::int', 'count')
      .where('credential.credential_group_id IN (:...ids)', {
        ids: credentialGroupIds,
      })
      .andWhere('credential.deleted_at IS NULL')
      .groupBy('credential.credential_group_id')
      .getRawMany<{ credentialGroupId: string; count: number }>();

    // Convert to Map for O(1) lookup
    const countMap = new Map<string, number>();
    for (const result of results) {
      countMap.set(result.credentialGroupId, result.count);
    }

    return countMap;
  }
}
