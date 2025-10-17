import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UpdateWorkspaceCommandRequestDto } from 'src/application/dtos/workspace/request/command/update-workspace.command.request.dto';
import { UpdateWorkspaceCommandResponseDto } from 'src/application/dtos/workspace/response/command/update-workspace.command.response.dto';
import { UpdateWorkspaceCommandService } from 'src/application/services/workspace/command/update-workspace.command.service';
import { GetWorkspaceByIdQueryService } from 'src/application/services/workspace/query/get-workspace-by-id.query.service';
import { GetAccountHasWorkspaceQueryService } from 'src/application/services/workspace/query/get-account-has-workspace.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { WorkspaceErrorMessagesEnum } from 'src/domain/enums/error-messages/workspace-error-messages.enum';

@Injectable()
export class UpdateWorkspaceCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly updateWorkspaceCommandService: UpdateWorkspaceCommandService,
    private readonly getWorkspaceByIdQueryService: GetWorkspaceByIdQueryService,
    private readonly getAccountHasWorkspaceQueryService: GetAccountHasWorkspaceQueryService,
  ) {}

  public async execute(
    accountId: string,
    workspaceId: string,
    body: UpdateWorkspaceCommandRequestDto,
  ): Promise<UpdateWorkspaceCommandResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if workspace exists
      const workspace =
        await this.getWorkspaceByIdQueryService.execute(workspaceId);

      if (!workspace) {
        throw new BusinessErrorException(
          WorkspaceErrorMessagesEnum.WORKSPACE_NOT_FOUND,
        );
      }

      // Check if user has access to this workspace
      const accountHasWorkspace =
        await this.getAccountHasWorkspaceQueryService.execute(
          accountId,
          workspaceId,
        );

      if (!accountHasWorkspace) {
        throw new BusinessErrorException(
          WorkspaceErrorMessagesEnum.WORKSPACE_ACCESS_DENIED,
        );
      }

      // Update workspace
      await this.updateWorkspaceCommandService.execute(
        queryRunner,
        workspaceId,
        body,
      );

      await queryRunner.commitTransaction();

      // Get updated workspace
      const updatedWorkspace =
        await this.getWorkspaceByIdQueryService.execute(workspaceId);

      if (!updatedWorkspace) {
        throw new BusinessErrorException(
          WorkspaceErrorMessagesEnum.WORKSPACE_NOT_FOUND,
        );
      }

      return new UpdateWorkspaceCommandResponseDto(updatedWorkspace);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
