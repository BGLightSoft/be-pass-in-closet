import { Inject, Injectable } from '@nestjs/common';
import { ICredentialParameterRepository } from 'src/domain/repositories/credential/credential-parameter.repository.interface';

@Injectable()
export class UpdateCredentialIndexesCommandService {
  constructor(
    @Inject(ICredentialParameterRepository)
    private readonly credentialParameterRepository: ICredentialParameterRepository,
  ) {}

  public async execute(
    credentialGroupId: string,
    credentialIndexes: Array<{ credentialId: string; index: number }>,
  ): Promise<void> {
    return this.credentialParameterRepository.updateCredentialIndexes(
      credentialGroupId,
      credentialIndexes,
    );
  }
}
