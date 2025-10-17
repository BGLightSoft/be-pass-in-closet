import { Inject, Injectable } from '@nestjs/common';
import { CredentialParameterModel } from 'src/domain/models/credential/credential-parameter.model';
import { ICredentialParameterRepository } from 'src/domain/repositories/credential/credential-parameter.repository.interface';

@Injectable()
export class GetCredentialParametersQueryService {
  constructor(
    @Inject(ICredentialParameterRepository)
    private readonly credentialParameterRepository: ICredentialParameterRepository,
  ) {}

  public async execute(
    credentialId: string,
  ): Promise<CredentialParameterModel[]> {
    return this.credentialParameterRepository.findByCredentialId(credentialId);
  }
}
