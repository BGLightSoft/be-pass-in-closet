import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DeleteCredentialGroupCommandResponseDto } from 'src/application/dtos/credential-group/response/command/delete-credential-group.command.response.dto';
import { DeleteCredentialGroupCommandService } from 'src/application/services/credential-group/command/delete-credential-group.command.service';
import { DeleteCredentialGroupCascadeCommandService } from 'src/application/services/credential-group/command/delete-credential-group-cascade.command.service';
import { DeleteCredentialsByGroupCommandService } from 'src/application/services/credential/command/delete-credentials-by-group.command.service';
import { DeleteCredentialParametersCommandService } from 'src/application/services/credential/command/delete-credential-parameters.command.service';
import { GetCredentialGroupByIdQueryService } from 'src/application/services/credential-group/query/get-credential-group-by-id.query.service';
import { GetCredentialGroupsByParentQueryService } from 'src/application/services/credential-group/query/get-credential-groups-by-parent.query.service';
import { GetCredentialsByGroupQueryService } from 'src/application/services/credential/query/get-credentials-by-group.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { CredentialGroupErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-group-error-messages.enum';

@Injectable()
export class DeleteCredentialGroupCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly deleteCredentialGroupCommandService: DeleteCredentialGroupCommandService,
    private readonly deleteCredentialGroupCascadeCommandService: DeleteCredentialGroupCascadeCommandService,
    private readonly deleteCredentialsByGroupCommandService: DeleteCredentialsByGroupCommandService,
    private readonly deleteCredentialParametersCommandService: DeleteCredentialParametersCommandService,
    private readonly getCredentialGroupByIdQueryService: GetCredentialGroupByIdQueryService,
    private readonly getCredentialGroupsByParentQueryService: GetCredentialGroupsByParentQueryService,
    private readonly getCredentialsByGroupQueryService: GetCredentialsByGroupQueryService,
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

      // Recursively delete child groups and their credentials
      await this.deleteGroupWithChildren(queryRunner, credentialGroupId);

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

  private async deleteGroupWithChildren(
    queryRunner: any,
    credentialGroupId: string,
  ): Promise<void> {
    // Get all child groups
    const childGroups =
      await this.getCredentialGroupsByParentQueryService.execute(
        credentialGroupId,
      );

    // Recursively delete child groups
    for (const childGroup of childGroups) {
      await this.deleteGroupWithChildren(queryRunner, childGroup.id!);
    }

    // Get all credentials in this group
    const credentials =
      await this.getCredentialsByGroupQueryService.execute(credentialGroupId);

    // Delete all credential parameters for each credential
    for (const credential of credentials) {
      await this.deleteCredentialParametersCommandService.execute(
        queryRunner,
        credential.id!,
      );
    }

    // Delete all credentials in this group
    await this.deleteCredentialsByGroupCommandService.execute(
      queryRunner,
      credentialGroupId,
    );

    // Delete the group itself
    await this.deleteCredentialGroupCommandService.execute(
      queryRunner,
      credentialGroupId,
    );
  }
}
