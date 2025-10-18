import { Inject, Injectable } from '@nestjs/common';
import { ICredentialRepository } from 'src/domain/repositories/credential/credential.repository.interface';
import { CredentialModel } from 'src/domain/models/credential/credential.model';

@Injectable()
export class GetCredentialsByGroupQueryService {
  constructor(
    @Inject(ICredentialRepository)
    private readonly credentialRepository: ICredentialRepository,
  ) {}

  public async execute(credentialGroupId: string): Promise<CredentialModel[]> {
    return this.credentialRepository.findByCredentialGroupId(credentialGroupId);
  }
}
