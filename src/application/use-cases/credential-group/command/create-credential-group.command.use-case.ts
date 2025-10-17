import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCredentialGroupCommandRequestDto } from 'src/application/dtos/credential-group/request/command/create-credential-group.command.request.dto';
import { CreateCredentialGroupCommandResponseDto } from 'src/application/dtos/credential-group/response/command/create-credential-group.command.response.dto';
import { CreateCredentialGroupCommandService } from 'src/application/services/credential-group/command/create-credential-group.command.service';
import { GetCredentialGroupTypeByNameQueryService } from 'src/application/services/credential-group/query/get-credential-group-type-by-name.query.service';
import { GetCredentialGroupByIdQueryService } from 'src/application/services/credential-group/query/get-credential-group-by-id.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { CredentialGroupErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-group-error-messages.enum';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';

@Injectable()
export class CreateCredentialGroupCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly createCredentialGroupCommandService: CreateCredentialGroupCommandService,
    private readonly getCredentialGroupTypeByNameQueryService: GetCredentialGroupTypeByNameQueryService,
    private readonly getCredentialGroupByIdQueryService: GetCredentialGroupByIdQueryService,
  ) {}

  public async execute(
    workspaceId: string,
    body: CreateCredentialGroupCommandRequestDto,
  ): Promise<CreateCredentialGroupCommandResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find credential group type by name
      const credentialGroupType =
        await this.getCredentialGroupTypeByNameQueryService.execute(
          body.credentialGroupTypeName,
        );

      if (!credentialGroupType) {
        throw new BusinessErrorException(
          CredentialGroupErrorMessagesEnum.CREDENTIAL_GROUP_TYPE_NOT_FOUND,
        );
      }

      // If parent group ID provided, validate it
      if (body.credentialGroupId) {
        const parentGroup =
          await this.getCredentialGroupByIdQueryService.execute(
            body.credentialGroupId,
          );

        if (!parentGroup) {
          throw new BusinessErrorException(
            CredentialGroupErrorMessagesEnum.PARENT_GROUP_NOT_FOUND,
          );
        }

        // Check if parent group belongs to same workspace
        if (parentGroup.workspaceId !== workspaceId) {
          throw new BusinessErrorException(
            CredentialGroupErrorMessagesEnum.CREDENTIAL_GROUP_ACCESS_DENIED,
          );
        }
      }

      // Create credential group
      const credentialGroupData: Partial<CredentialGroupModel> = {
        credentialGroupTypeId: credentialGroupType.id!,
        credentialGroupId: body.credentialGroupId || null,
        workspaceId,
        name: body.name,
        isActive: true,
      };

      const credentialGroup =
        await this.createCredentialGroupCommandService.execute(
          queryRunner,
          credentialGroupData,
        );

      await queryRunner.commitTransaction();

      return new CreateCredentialGroupCommandResponseDto(credentialGroup);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
