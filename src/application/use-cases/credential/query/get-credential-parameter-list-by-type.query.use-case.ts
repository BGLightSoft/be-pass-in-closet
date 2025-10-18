import { Injectable } from '@nestjs/common';
import { GetCredentialParameterListByTypeQueryService } from 'src/application/services/credential/query/get-credential-parameter-list-by-type.query.service';
import { GetCredentialParameterListQueryResponseDto } from 'src/application/dtos/credential/response/query/get-credential-parameter-list.query.response.dto';

@Injectable()
export class GetCredentialParameterListByTypeQueryUseCase {
  constructor(
    private readonly getCredentialParameterListByTypeQueryService: GetCredentialParameterListByTypeQueryService,
  ) {}

  public async execute(
    credentialGroupTypeId: string,
  ): Promise<GetCredentialParameterListQueryResponseDto[]> {
    const parameterList =
      await this.getCredentialParameterListByTypeQueryService.execute(
        credentialGroupTypeId,
      );

    return parameterList.map(
      (param) => new GetCredentialParameterListQueryResponseDto(param),
    );
  }
}
