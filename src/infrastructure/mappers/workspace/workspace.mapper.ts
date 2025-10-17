import { IMapper } from 'src/domain/mapper/mapper.interface';
import { WorkspaceModel } from 'src/domain/models/workspace/workspace.model';
import { Workspaces } from '../../database/postgres/entities/Workspaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceMapper implements IMapper<Workspaces, WorkspaceModel> {
  toDomain(entity: Workspaces): WorkspaceModel {
    return new WorkspaceModel({
      id: entity.id,
      name: entity.name,
      isActive: entity.isActive === true,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt) : new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    });
  }

  toEntity(domain: WorkspaceModel): Workspaces {
    const entity = new Workspaces();
    entity.name = domain.name;
    entity.isActive = domain.isActive ? true : false;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}
