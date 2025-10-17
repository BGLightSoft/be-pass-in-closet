import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DeleteWorkspaceCommandResponseDto } from 'src/application/dtos/workspace/response/command/delete-workspace.command.response.dto';
import { DeleteWorkspaceCommandService } from 'src/application/services/workspace/command/delete-workspace.command.service';
import { DeleteAccountHasWorkspaceCommandService } from 'src/application/services/workspace/command/delete-account-has-workspace.command.service';
import { GetWorkspaceByIdQueryService } from 'src/application/services/workspace/query/get-workspace-by-id.query.service';
import { GetAccountHasWorkspaceQueryService } from 'src/application/services/workspace/query/get-account-has-workspace.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { WorkspaceErrorMessagesEnum } from 'src/domain/enums/error-messages/workspace-error-messages.enum';

@Injectable()
export class DeleteWorkspaceCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly deleteWorkspaceCommandService: DeleteWorkspaceCommandService,
    private readonly deleteAccountHasWorkspaceCommandService: DeleteAccountHasWorkspaceCommandService,
    private readonly getWorkspaceByIdQueryService: GetWorkspaceByIdQueryService,
    private readonly getAccountHasWorkspaceQueryService: GetAccountHasWorkspaceQueryService,
  ) {}

  public async execute(
    accountId: string,
    workspaceId: string,
  ): Promise<DeleteWorkspaceCommandResponseDto> {
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

      // Hard delete account-has-workspace relationship
      await this.deleteAccountHasWorkspaceCommandService.execute(
        queryRunner,
        workspaceId,
      );

      // Soft delete workspace
      await this.deleteWorkspaceCommandService.execute(
        queryRunner,
        workspaceId,
      );

      await queryRunner.commitTransaction();

      return new DeleteWorkspaceCommandResponseDto(
        'Workspace deleted successfully',
        true,
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
