import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WorkspaceModel } from 'src/domain/models/workspace/workspace.model';
import { IWorkspaceRepository } from 'src/domain/repositories/workspace/workspace.repository.interface';
import { Workspaces } from 'src/infrastructure/database/postgres/entities/Workspaces';
import { WorkspaceMapper } from 'src/infrastructure/mappers/workspace/workspace.mapper';
import { BaseRepository } from '../base/base-repository';

@Injectable()
export class WorkspaceRepository
  extends BaseRepository<Workspaces, WorkspaceModel>
  implements IWorkspaceRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, Workspaces, new WorkspaceMapper());
  }

  async findByName(name: string): Promise<WorkspaceModel | null> {
    const entity = await this.repository.findOneBy({ name });
    return entity ? this.mapper.toDomain(entity) : null;
  }
}
