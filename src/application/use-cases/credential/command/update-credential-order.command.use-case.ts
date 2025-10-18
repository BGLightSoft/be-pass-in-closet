import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UpdateCredentialOrderRequestDto } from 'src/application/dtos/credential/request/command/update-credential-order.command.request.dto';
import { GetCredentialsByGroupQueryService } from 'src/application/services/credential/query/get-credentials-by-group.query.service';
import { GetCredentialGroupByIdQueryService } from 'src/application/services/credential-group/query/get-credential-group-by-id.query.service';
import { UpdateCredentialIndexesCommandService } from 'src/application/services/credential/command/update-credential-indexes.command.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { CredentialErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-error-messages.enum';
import { CredentialGroupErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-group-error-messages.enum';

@Injectable()
export class UpdateCredentialOrderCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly getCredentialsByGroupQueryService: GetCredentialsByGroupQueryService,
    private readonly getCredentialGroupByIdQueryService: GetCredentialGroupByIdQueryService,
    private readonly updateCredentialIndexesCommandService: UpdateCredentialIndexesCommandService,
  ) {}

  public async execute(
    workspaceId: string,
    credentialGroupId: string,
    body: UpdateCredentialOrderRequestDto,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Validate credential group exists and belongs to workspace
      const credentialGroup =
        await this.getCredentialGroupByIdQueryService.execute(
          credentialGroupId,
        );

      if (!credentialGroup) {
        throw new BusinessErrorException(
          CredentialGroupErrorMessagesEnum.CREDENTIAL_GROUP_NOT_FOUND,
        );
      }

      if (credentialGroup.workspaceId !== workspaceId) {
        throw new BusinessErrorException(
          CredentialGroupErrorMessagesEnum.CREDENTIAL_GROUP_ACCESS_DENIED,
        );
      }

      // 2. Validate all credentialIds in the request belong to this group
      const existingCredentialsInGroup =
        await this.getCredentialsByGroupQueryService.execute(credentialGroupId);
      const existingCredentialIds = new Set(
        existingCredentialsInGroup.map((c) => c.id),
      );

      for (const item of body.credentials) {
        if (!existingCredentialIds.has(item.credentialId)) {
          throw new BusinessErrorException(
            CredentialErrorMessagesEnum.CREDENTIAL_NOT_FOUND,
          );
        }
      }

      // 3. Update credential indexes
      await this.updateCredentialIndexesCommandService.execute(
        credentialGroupId,
        body.credentials,
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
