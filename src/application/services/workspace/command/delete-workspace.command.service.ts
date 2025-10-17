import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IWorkspaceRepository } from 'src/domain/repositories/workspace/workspace.repository.interface';

@Injectable()
export class DeleteWorkspaceCommandService {
  constructor(
    @Inject(IWorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    workspaceId: string,
  ): Promise<any> {
    return await this.workspaceRepository.softDelete(
      { id: workspaceId },
      queryRunner,
    );
  }
}
