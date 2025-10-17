import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DeleteCredentialCommandResponseDto } from 'src/application/dtos/credential/response/command/delete-credential.command.response.dto';
import { DeleteCredentialCommandService } from 'src/application/services/credential/command/delete-credential.command.service';
import { GetCredentialByIdQueryService } from 'src/application/services/credential/query/get-credential-by-id.query.service';
import { GetCredentialGroupByIdQueryService } from 'src/application/services/credential-group/query/get-credential-group-by-id.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { CredentialErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-error-messages.enum';
import { CredentialGroupErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-group-error-messages.enum';

@Injectable()
export class DeleteCredentialCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly deleteCredentialCommandService: DeleteCredentialCommandService,
    private readonly getCredentialByIdQueryService: GetCredentialByIdQueryService,
    private readonly getCredentialGroupByIdQueryService: GetCredentialGroupByIdQueryService,
  ) {}

  public async execute(
    workspaceId: string,
    credentialId: string,
  ): Promise<DeleteCredentialCommandResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

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

      // Soft delete credential
      await this.deleteCredentialCommandService.execute(
        queryRunner,
        credentialId,
      );

      await queryRunner.commitTransaction();

      return new DeleteCredentialCommandResponseDto(
        'Credential deleted successfully',
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
