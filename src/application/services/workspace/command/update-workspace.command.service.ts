import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IWorkspaceRepository } from 'src/domain/repositories/workspace/workspace.repository.interface';
import { WorkspaceModel } from 'src/domain/models/workspace/workspace.model';

@Injectable()
export class UpdateWorkspaceCommandService {
  constructor(
    @Inject(IWorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    workspaceId: string,
    workspaceData: Partial<WorkspaceModel>,
  ): Promise<any> {
    const updatePayload: Partial<WorkspaceModel> = {
      ...workspaceData,
    };

    return await this.workspaceRepository.update(
      { id: workspaceId },
      updatePayload as any,
      queryRunner,
    );
  }
}
