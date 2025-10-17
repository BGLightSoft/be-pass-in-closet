import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateWorkspaceCommandRequestDto } from 'src/application/dtos/workspace/request/command/create-workspace.command.request.dto';
import { CreateWorkspaceCommandResponseDto } from 'src/application/dtos/workspace/response/command/create-workspace.command.response.dto';
import { CreateWorkspaceCommandService } from 'src/application/services/workspace/command/create-workspace.command.service';
import { CreateAccountHasWorkspaceCommandService } from 'src/application/services/workspace/command/create-account-has-workspace.command.service';
import { CheckUserHasWorkspaceQueryService } from 'src/application/services/workspace/query/check-user-has-workspace.query.service';
import { WorkspaceModel } from 'src/domain/models/workspace/workspace.model';

@Injectable()
export class CreateWorkspaceCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly createWorkspaceCommandService: CreateWorkspaceCommandService,
    private readonly createAccountHasWorkspaceCommandService: CreateAccountHasWorkspaceCommandService,
    private readonly checkUserHasWorkspaceQueryService: CheckUserHasWorkspaceQueryService,
  ) {}

  public async execute(
    accountId: string,
    body: CreateWorkspaceCommandRequestDto,
  ): Promise<CreateWorkspaceCommandResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if user has any workspace (for isDefault logic)
      const hasWorkspace =
        await this.checkUserHasWorkspaceQueryService.execute(accountId);

      // Create workspace
      const workspaceData: Partial<WorkspaceModel> = {
        name: body.name,
        isActive: true,
      };

      const workspace = await this.createWorkspaceCommandService.execute(
        queryRunner,
        workspaceData,
      );

      // Create account-workspace relationship
      await this.createAccountHasWorkspaceCommandService.execute(queryRunner, {
        accountId,
        workspaceId: workspace.id!,
        isDefault: !hasWorkspace, // First workspace is default
        isActive: true,
      });

      await queryRunner.commitTransaction();

      return new CreateWorkspaceCommandResponseDto(workspace);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
