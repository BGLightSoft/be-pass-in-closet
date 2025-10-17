import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DeleteCredentialGroupCommandResponseDto } from 'src/application/dtos/credential-group/response/command/delete-credential-group.command.response.dto';
import { DeleteCredentialGroupCommandService } from 'src/application/services/credential-group/command/delete-credential-group.command.service';
import { GetCredentialGroupByIdQueryService } from 'src/application/services/credential-group/query/get-credential-group-by-id.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { CredentialGroupErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-group-error-messages.enum';

@Injectable()
export class DeleteCredentialGroupCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly deleteCredentialGroupCommandService: DeleteCredentialGroupCommandService,
    private readonly getCredentialGroupByIdQueryService: GetCredentialGroupByIdQueryService,
  ) {}

  public async execute(
    workspaceId: string,
    credentialGroupId: string,
  ): Promise<DeleteCredentialGroupCommandResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if credential group exists
      const credentialGroup =
        await this.getCredentialGroupByIdQueryService.execute(
          credentialGroupId,
        );

      if (!credentialGroup) {
        throw new BusinessErrorException(
          CredentialGroupErrorMessagesEnum.CREDENTIAL_GROUP_NOT_FOUND,
        );
      }

      // Check if group belongs to workspace
      if (credentialGroup.workspaceId !== workspaceId) {
        throw new BusinessErrorException(
          CredentialGroupErrorMessagesEnum.CREDENTIAL_GROUP_ACCESS_DENIED,
        );
      }

      // Soft delete credential group
      await this.deleteCredentialGroupCommandService.execute(
        queryRunner,
        credentialGroupId,
      );

      await queryRunner.commitTransaction();

      return new DeleteCredentialGroupCommandResponseDto(
        'Credential group deleted successfully',
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
