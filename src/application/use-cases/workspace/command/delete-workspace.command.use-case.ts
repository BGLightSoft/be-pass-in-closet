import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DeleteWorkspaceCommandResponseDto } from 'src/application/dtos/workspace/response/command/delete-workspace.command.response.dto';
import { DeleteWorkspaceCommandService } from 'src/application/services/workspace/command/delete-workspace.command.service';
import { DeleteAccountHasWorkspaceCommandService } from 'src/application/services/workspace/command/delete-account-has-workspace.command.service';
import { DeleteCredentialsByWorkspaceCommandService } from 'src/application/services/credential/command/delete-credentials-by-workspace.command.service';
import { DeleteCredentialParametersCommandService } from 'src/application/services/credential/command/delete-credential-parameters.command.service';
import { GetWorkspaceByIdQueryService } from 'src/application/services/workspace/query/get-workspace-by-id.query.service';
import { GetAccountHasWorkspaceQueryService } from 'src/application/services/workspace/query/get-account-has-workspace.query.service';
import { GetCredentialGroupsByWorkspaceQueryService } from 'src/application/services/credential-group/query/get-credential-groups-by-workspace.query.service';
import { GetCredentialsByGroupQueryService } from 'src/application/services/credential/query/get-credentials-by-group.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { WorkspaceErrorMessagesEnum } from 'src/domain/enums/error-messages/workspace-error-messages.enum';

@Injectable()
export class DeleteWorkspaceCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly deleteWorkspaceCommandService: DeleteWorkspaceCommandService,
    private readonly deleteAccountHasWorkspaceCommandService: DeleteAccountHasWorkspaceCommandService,
    private readonly deleteCredentialsByWorkspaceCommandService: DeleteCredentialsByWorkspaceCommandService,
    private readonly deleteCredentialParametersCommandService: DeleteCredentialParametersCommandService,
    private readonly getWorkspaceByIdQueryService: GetWorkspaceByIdQueryService,
    private readonly getAccountHasWorkspaceQueryService: GetAccountHasWorkspaceQueryService,
    private readonly getCredentialGroupsByWorkspaceQueryService: GetCredentialGroupsByWorkspaceQueryService,
    private readonly getCredentialsByGroupQueryService: GetCredentialsByGroupQueryService,
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

      // Get all credential groups in workspace
      const credentialGroups =
        await this.getCredentialGroupsByWorkspaceQueryService.execute(
          workspaceId,
        );

      // Delete all credentials and their parameters for each group
      for (const group of credentialGroups) {
        const credentials =
          await this.getCredentialsByGroupQueryService.execute(group.id!);

        // Delete parameters for each credential
        for (const credential of credentials) {
          await this.deleteCredentialParametersCommandService.execute(
            queryRunner,
            credential.id!,
          );
        }
      }

      // Soft delete all credential groups in workspace
      await this.deleteCredentialsByWorkspaceCommandService.execute(
        queryRunner,
        workspaceId,
      );

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
