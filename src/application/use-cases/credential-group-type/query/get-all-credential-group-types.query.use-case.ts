import { Injectable } from '@nestjs/common';
import { GetAllCredentialGroupTypesQueryService } from 'src/application/services/credential-group-type/query/get-all-credential-group-types.query.service';
import { GetCredentialGroupTypeQueryResponseDto } from 'src/application/dtos/credential-group-type/response/query/get-credential-group-type.query.response.dto';

@Injectable()
export class GetAllCredentialGroupTypesQueryUseCase {
  constructor(
    private readonly getAllCredentialGroupTypesQueryService: GetAllCredentialGroupTypesQueryService,
  ) {}

  public async execute(): Promise<GetCredentialGroupTypeQueryResponseDto[]> {
    try {
      const credentialGroupTypes =
        await this.getAllCredentialGroupTypesQueryService.execute();

      return credentialGroupTypes.map(
        (type) => new GetCredentialGroupTypeQueryResponseDto(type),
      );
    } catch (error) {
      throw error;
    }
  }
}
