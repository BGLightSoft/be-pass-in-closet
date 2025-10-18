import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SetDefaultWorkspaceCommandRequestDto } from 'src/application/dtos/workspace/request/command/set-default-workspace.command.request.dto';
import { GetWorkspaceByIdQueryService } from 'src/application/services/workspace/query/get-workspace-by-id.query.service';
import { GetAccountHasWorkspaceQueryService } from 'src/application/services/workspace/query/get-account-has-workspace.query.service';
import { ResetAccountWorkspacesDefaultStatusCommandService } from 'src/application/services/workspace/command/reset-account-workspaces-default-status.command.service';
import { UpdateAccountWorkspaceDefaultStatusCommandService } from 'src/application/services/workspace/command/update-account-workspace-default-status.command.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { WorkspaceErrorMessagesEnum } from 'src/domain/enums/error-messages/workspace-error-messages.enum';

@Injectable()
export class SetDefaultWorkspaceCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly getWorkspaceByIdQueryService: GetWorkspaceByIdQueryService,
    private readonly getAccountHasWorkspaceQueryService: GetAccountHasWorkspaceQueryService,
    private readonly resetAccountWorkspacesDefaultStatusCommandService: ResetAccountWorkspacesDefaultStatusCommandService,
    private readonly updateAccountWorkspaceDefaultStatusCommandService: UpdateAccountWorkspaceDefaultStatusCommandService,
  ) {}

  async execute(
    accountId: string,
    dto: SetDefaultWorkspaceCommandRequestDto,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if workspace exists
      const workspace = await this.getWorkspaceByIdQueryService.execute(
        dto.workspaceId,
      );

      if (!workspace) {
        throw new BusinessErrorException(
          WorkspaceErrorMessagesEnum.WORKSPACE_NOT_FOUND,
        );
      }

      // Check if user has access to this workspace
      const accountHasWorkspace =
        await this.getAccountHasWorkspaceQueryService.execute(
          accountId,
          dto.workspaceId,
        );

      if (!accountHasWorkspace) {
        throw new BusinessErrorException(
          WorkspaceErrorMessagesEnum.WORKSPACE_ACCESS_DENIED,
        );
      }

      // Reset all workspaces of this account to non-default
      await this.resetAccountWorkspacesDefaultStatusCommandService.execute(
        accountId,
        queryRunner,
      );

      // Set the selected workspace as default
      await this.updateAccountWorkspaceDefaultStatusCommandService.execute(
        accountId,
        dto.workspaceId,
        true,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
