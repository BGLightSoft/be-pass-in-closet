import { Inject, Injectable } from '@nestjs/common';
import { ICredentialRepository } from 'src/domain/repositories/credential/credential.repository.interface';

@Injectable()
export class CountCredentialsByGroupsQueryService {
  constructor(
    @Inject(ICredentialRepository)
    private readonly credentialRepository: ICredentialRepository,
  ) {}

  public async execute(
    credentialGroupIds: string[],
  ): Promise<Map<string, number>> {
    return this.credentialRepository.countByCredentialGroupIds(
      credentialGroupIds,
    );
  }
}
