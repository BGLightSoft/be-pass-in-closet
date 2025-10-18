import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCredentialCommandRequestDto } from 'src/application/dtos/credential/request/command/create-credential.command.request.dto';
import { CreateCredentialCommandResponseDto } from 'src/application/dtos/credential/response/command/create-credential.command.response.dto';
import { CreateCredentialCommandService } from 'src/application/services/credential/command/create-credential.command.service';
import { CreateCredentialParameterCommandService } from 'src/application/services/credential/command/create-credential-parameter.command.service';
import { GetCredentialGroupByIdQueryService } from 'src/application/services/credential-group/query/get-credential-group-by-id.query.service';
import { GetCredentialParameterListByTypeQueryService } from 'src/application/services/credential/query/get-credential-parameter-list-by-type.query.service';
import { GetCredentialsByGroupQueryService } from 'src/application/services/credential/query/get-credentials-by-group.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { CredentialGroupErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-group-error-messages.enum';
import { CredentialModel } from 'src/domain/models/credential/credential.model';
import { CredentialParameterModel } from 'src/domain/models/credential/credential-parameter.model';

@Injectable()
export class CreateCredentialCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly createCredentialCommandService: CreateCredentialCommandService,
    private readonly createCredentialParameterCommandService: CreateCredentialParameterCommandService,
    private readonly getCredentialGroupByIdQueryService: GetCredentialGroupByIdQueryService,
    private readonly getCredentialParameterListByTypeQueryService: GetCredentialParameterListByTypeQueryService,
    private readonly getCredentialsByGroupQueryService: GetCredentialsByGroupQueryService,
  ) {}

  public async execute(
    workspaceId: string,
    body: CreateCredentialCommandRequestDto,
  ): Promise<CreateCredentialCommandResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const credentialGroup =
        await this.getCredentialGroupByIdQueryService.execute(
          body.credentialGroupId,
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

      const credentialGroupTypeId = credentialGroup.credentialGroupTypeId;

      if (!credentialGroupTypeId) {
        throw new BusinessErrorException(
          CredentialGroupErrorMessagesEnum.CREDENTIAL_GROUP_TYPE_NOT_FOUND,
        );
      }

      const parameterListTemplates =
        await this.getCredentialParameterListByTypeQueryService.execute(
          credentialGroupTypeId,
        );

      const credentialData: Partial<CredentialModel> = {
        credentialGroupId: body.credentialGroupId,
        name: body.name,
        isActive: true,
      };

      const credential = await this.createCredentialCommandService.execute(
        queryRunner,
        credentialData,
      );

      const existingCredentials =
        await this.getCredentialsByGroupQueryService.execute(
          body.credentialGroupId,
        );
      const nextIndex = existingCredentials.length;

      for (const template of parameterListTemplates) {
        const parameterName = template.name;

        if (parameterName === 'index') {
          continue;
        }

        let parameterData = template.data;

        if (parameterName && body.parameters[parameterName] !== undefined) {
          parameterData = {
            ...template.data,
            value: body.parameters[parameterName],
          };
        }

        const credentialParameter: Partial<CredentialParameterModel> = {
          credentialId: credential.id!,
          name: parameterName,
          data: parameterData,
          isActive: true,
        };

        await this.createCredentialParameterCommandService.execute(
          queryRunner,
          credentialParameter,
        );
      }

      const indexParameter: Partial<CredentialParameterModel> = {
        credentialId: credential.id!,
        name: 'index',
        data: { value: nextIndex.toString() },
        isActive: true,
      };

      await this.createCredentialParameterCommandService.execute(
        queryRunner,
        indexParameter,
      );

      await queryRunner.commitTransaction();

      return new CreateCredentialCommandResponseDto(credential);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
