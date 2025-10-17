import { Inject, Injectable } from '@nestjs/common';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';
import { ICredentialGroupRepository } from 'src/domain/repositories/credential/credential-group.repository.interface';

@Injectable()
export class GetCredentialGroupsByParentQueryService {
  constructor(
    @Inject(ICredentialGroupRepository)
    private readonly credentialGroupRepository: ICredentialGroupRepository,
  ) {}

  public async execute(
    credentialGroupId: string,
  ): Promise<CredentialGroupModel[]> {
    return this.credentialGroupRepository.findByCredentialGroupId(
      credentialGroupId,
    );
  }
}
