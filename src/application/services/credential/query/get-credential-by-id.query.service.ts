import { Inject, Injectable } from '@nestjs/common';
import { CredentialModel } from 'src/domain/models/credential/credential.model';
import { ICredentialRepository } from 'src/domain/repositories/credential/credential.repository.interface';

@Injectable()
export class GetCredentialByIdQueryService {
  constructor(
    @Inject(ICredentialRepository)
    private readonly credentialRepository: ICredentialRepository,
  ) {}

  public async execute(credentialId: string): Promise<CredentialModel | null> {
    return this.credentialRepository.findOne({
      where: { id: credentialId },
    });
  }
}
