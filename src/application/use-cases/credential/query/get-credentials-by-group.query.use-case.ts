import { Injectable } from '@nestjs/common';
import { GetCredentialsByGroupQueryService } from 'src/application/services/credential/query/get-credentials-by-group.query.service';
import { GetCredentialParametersQueryService } from 'src/application/services/credential/query/get-credential-parameters.query.service';
import { GetCredentialGroupByIdQueryService } from 'src/application/services/credential-group/query/get-credential-group-by-id.query.service';
import { GetCredentialQueryResponseDto } from 'src/application/dtos/credential/response/query/get-credential.query.response.dto';
import { CredentialParameterResponseDto } from 'src/application/dtos/credential/response/credential-parameter.response.dto';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { CredentialGroupErrorMessagesEnum } from 'src/domain/enums/error-messages/credential-group-error-messages.enum';

@Injectable()
export class GetCredentialsByGroupQueryUseCase {
  constructor(
    private readonly getCredentialsByGroupQueryService: GetCredentialsByGroupQueryService,
    private readonly getCredentialParametersQueryService: GetCredentialParametersQueryService,
    private readonly getCredentialGroupByIdQueryService: GetCredentialGroupByIdQueryService,
  ) {}

  public async execute(
    workspaceId: string,
    credentialGroupId: string,
  ): Promise<GetCredentialQueryResponseDto[]> {
    try {
      // Check if group exists and belongs to workspace
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

      // Get all credentials for this group
      const credentials =
        await this.getCredentialsByGroupQueryService.execute(credentialGroupId);

      // Get parameters for each credential
      const credentialsWithParameters = await Promise.all(
        credentials.map(async (credential) => {
          const parameterModels =
            await this.getCredentialParametersQueryService.execute(
              credential.id!,
            );

          // Transform parameters to clean format
          const parameters =
            CredentialParameterResponseDto.fromModelsArray(parameterModels);

          return new GetCredentialQueryResponseDto(credential, parameters);
        }),
      );

      return credentialsWithParameters;
    } catch (error) {
      throw error;
    }
  }
}
