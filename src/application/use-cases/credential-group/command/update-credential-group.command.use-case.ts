import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UpdateCredentialGroupCommandRequestDto } from 'src/application/dtos/credential-group/request/command/update-credential-group.command.request.dto';
import { UpdateCredentialGroupCommandResponseDto } from 'src/application/dtos/credential-group/response/command/update-credential-group.command.response.dto';
import { UpdateCredentialGroupCommandService } from 'src/application/services/credential-group/command/update-credential-group.command.service';
import { GetCredentialGroupByIdQueryService } from 'src/application/services/credential-group/query/get-credential-group-by-id.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { CredentialGroupErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-group-error-messages.enum';

@Injectable()
export class UpdateCredentialGroupCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly updateCredentialGroupCommandService: UpdateCredentialGroupCommandService,
    private readonly getCredentialGroupByIdQueryService: GetCredentialGroupByIdQueryService,
  ) {}

  public async execute(
    workspaceId: string,
    credentialGroupId: string,
    body: UpdateCredentialGroupCommandRequestDto,
  ): Promise<UpdateCredentialGroupCommandResponseDto> {
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

      // Update credential group
      await this.updateCredentialGroupCommandService.execute(
        queryRunner,
        credentialGroupId,
        body,
      );

      await queryRunner.commitTransaction();

      // Get updated credential group
      const updatedCredentialGroup =
        await this.getCredentialGroupByIdQueryService.execute(
          credentialGroupId,
        );

      if (!updatedCredentialGroup) {
        throw new BusinessErrorException(
          CredentialGroupErrorMessagesEnum.CREDENTIAL_GROUP_NOT_FOUND,
        );
      }

      return new UpdateCredentialGroupCommandResponseDto(
        updatedCredentialGroup,
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
