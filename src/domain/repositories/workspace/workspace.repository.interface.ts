import { WorkspaceModel } from 'src/domain/models/workspace/workspace.model';
import { IBaseRepository } from '../base.repository.interface';
import { Workspaces } from 'src/infrastructure/database/postgres/entities/Workspaces';

export interface IWorkspaceRepository
  extends IBaseRepository<Workspaces, WorkspaceModel> {
  findByName(name: string): Promise<WorkspaceModel | null>;
}

export const IWorkspaceRepository = Symbol('IWorkspaceRepository');
