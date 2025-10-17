import { Inject, Injectable } from '@nestjs/common';
import { WorkspaceModel } from 'src/domain/models/workspace/workspace.model';
import { IWorkspaceRepository } from 'src/domain/repositories/workspace/workspace.repository.interface';

@Injectable()
export class GetWorkspaceByIdQueryService {
  constructor(
    @Inject(IWorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  public async execute(workspaceId: string): Promise<WorkspaceModel | null> {
    return this.workspaceRepository.findOne({
      where: { id: workspaceId },
    });
  }
}
