import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DeleteCredentialCommandResponseDto } from 'src/application/dtos/credential/response/command/delete-credential.command.response.dto';
import { DeleteCredentialCommandService } from 'src/application/services/credential/command/delete-credential.command.service';
import { DeleteCredentialParametersCommandService } from 'src/application/services/credential/command/delete-credential-parameters.command.service';
import { GetCredentialByIdQueryService } from 'src/application/services/credential/query/get-credential-by-id.query.service';
import { GetCredentialGroupByIdQueryService } from 'src/application/services/credential-group/query/get-credential-group-by-id.query.service';
import { GetCredentialsByGroupQueryService } from 'src/application/services/credential/query/get-credentials-by-group.query.service';
import { UpdateCredentialIndexesCommandService } from 'src/application/services/credential/command/update-credential-indexes.command.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { CredentialErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-error-messages.enum';
import { CredentialGroupErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-group-error-messages.enum';

@Injectable()
export class DeleteCredentialCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly deleteCredentialCommandService: DeleteCredentialCommandService,
    private readonly deleteCredentialParametersCommandService: DeleteCredentialParametersCommandService,
    private readonly getCredentialByIdQueryService: GetCredentialByIdQueryService,
    private readonly getCredentialGroupByIdQueryService: GetCredentialGroupByIdQueryService,
    private readonly getCredentialsByGroupQueryService: GetCredentialsByGroupQueryService,
    private readonly updateCredentialIndexesCommandService: UpdateCredentialIndexesCommandService,
  ) {}

  public async execute(
    workspaceId: string,
    credentialId: string,
  ): Promise<DeleteCredentialCommandResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let credentialGroupId: string | null = null;

    try {
      // Check if credential exists
      const credential =
        await this.getCredentialByIdQueryService.execute(credentialId);

      if (!credential) {
        throw new BusinessErrorException(
          CredentialErrorMessagesEnum.CREDENTIAL_NOT_FOUND,
        );
      }

      // Get credential group to check workspace
      const credentialGroup =
        await this.getCredentialGroupByIdQueryService.execute(
          credential.credentialGroupId!,
        );

      if (!credentialGroup) {
        throw new BusinessErrorException(
          CredentialGroupErrorMessagesEnum.CREDENTIAL_GROUP_NOT_FOUND,
        );
      }

      // Check if group belongs to workspace
      if (credentialGroup.workspaceId !== workspaceId) {
        throw new BusinessErrorException(
          CredentialErrorMessagesEnum.CREDENTIAL_ACCESS_DENIED,
        );
      }

      // Store credential group ID before deletion
      credentialGroupId = credential.credentialGroupId!;

      // Soft delete credential parameters first
      await this.deleteCredentialParametersCommandService.execute(
        queryRunner,
        credentialId,
      );

      // Soft delete credential
      await this.deleteCredentialCommandService.execute(
        queryRunner,
        credentialId,
      );

      // Commit deletion transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    // Re-index remaining credentials in the group (outside transaction)
    if (credentialGroupId) {
      const remainingCredentials =
        await this.getCredentialsByGroupQueryService.execute(credentialGroupId);

      // Update indexes sequentially (0, 1, 2, ...)
      const reindexedCredentials = remainingCredentials.map((cred, index) => ({
        credentialId: cred.id!,
        index: index,
      }));

      if (reindexedCredentials.length > 0) {
        await this.updateCredentialIndexesCommandService.execute(
          credentialGroupId,
          reindexedCredentials,
        );
      }
    }

    return new DeleteCredentialCommandResponseDto(
      'Credential deleted successfully',
      true,
    );
  }
}
