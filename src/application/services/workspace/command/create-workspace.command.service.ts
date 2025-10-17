import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IWorkspaceRepository } from 'src/domain/repositories/workspace/workspace.repository.interface';
import { WorkspaceModel } from 'src/domain/models/workspace/workspace.model';

@Injectable()
export class CreateWorkspaceCommandService {
  constructor(
    @Inject(IWorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    workspaceData: Partial<WorkspaceModel>,
  ): Promise<WorkspaceModel> {
    return await this.workspaceRepository.save(
      workspaceData,
      undefined,
      queryRunner,
    );
  }
}
