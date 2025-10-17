import { Inject, Injectable } from '@nestjs/common';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';
import { ICredentialGroupRepository } from 'src/domain/repositories/credential/credential-group.repository.interface';

@Injectable()
export class GetCredentialGroupsByWorkspaceQueryService {
  constructor(
    @Inject(ICredentialGroupRepository)
    private readonly credentialGroupRepository: ICredentialGroupRepository,
  ) {}

  public async execute(workspaceId: string): Promise<CredentialGroupModel[]> {
    return this.credentialGroupRepository.findByWorkspaceId(workspaceId);
  }
}
