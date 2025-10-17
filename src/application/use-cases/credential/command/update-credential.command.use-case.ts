import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UpdateCredentialCommandRequestDto } from 'src/application/dtos/credential/request/command/update-credential.command.request.dto';
import { UpdateCredentialCommandResponseDto } from 'src/application/dtos/credential/response/command/update-credential.command.response.dto';
import { UpdateCredentialCommandService } from 'src/application/services/credential/command/update-credential.command.service';
import { UpdateCredentialParameterCommandService } from 'src/application/services/credential/command/update-credential-parameter.command.service';
import { GetCredentialByIdQueryService } from 'src/application/services/credential/query/get-credential-by-id.query.service';
import { GetCredentialGroupByIdQueryService } from 'src/application/services/credential-group/query/get-credential-group-by-id.query.service';
import { GetCredentialParametersQueryService } from 'src/application/services/credential/query/get-credential-parameters.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { CredentialErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-error-messages.enum';
import { CredentialGroupErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-group-error-messages.enum';

@Injectable()
export class UpdateCredentialCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly updateCredentialCommandService: UpdateCredentialCommandService,
    private readonly updateCredentialParameterCommandService: UpdateCredentialParameterCommandService,
    private readonly getCredentialByIdQueryService: GetCredentialByIdQueryService,
    private readonly getCredentialGroupByIdQueryService: GetCredentialGroupByIdQueryService,
    private readonly getCredentialParametersQueryService: GetCredentialParametersQueryService,
  ) {}

  public async execute(
    workspaceId: string,
    credentialId: string,
    body: UpdateCredentialCommandRequestDto,
  ): Promise<UpdateCredentialCommandResponseDto> {
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

      // Update credential
      if (body.name !== undefined || body.isActive !== undefined) {
        const updateData: any = {};
        if (body.name !== undefined) updateData.name = body.name;
        if (body.isActive !== undefined) updateData.isActive = body.isActive;

        await this.updateCredentialCommandService.execute(
          queryRunner,
          credentialId,
          updateData,
        );
      }

      // Update credential parameters if provided
      if (body.parameters) {
        // Get existing parameters
        const existingParameters =
          await this.getCredentialParametersQueryService.execute(credentialId);

        // Update each parameter
        for (const [paramName, paramValue] of Object.entries(body.parameters)) {
          // Find existing parameter
          const existingParam = existingParameters.find(
            (p) => p.name === paramName,
          );

          if (existingParam) {
            // Preserve the structure, only update the value
            const updatedData = {
              ...(existingParam.data as object),
              value: paramValue,
            };

            await this.updateCredentialParameterCommandService.execute(
              queryRunner,
              credentialId,
              paramName,
              updatedData,
            );
          }
        }
      }

      await queryRunner.commitTransaction();

      // Get updated credential
      const updatedCredential =
        await this.getCredentialByIdQueryService.execute(credentialId);

      if (!updatedCredential) {
        throw new BusinessErrorException(
          CredentialErrorMessagesEnum.CREDENTIAL_NOT_FOUND,
        );
      }

      return new UpdateCredentialCommandResponseDto(updatedCredential);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
