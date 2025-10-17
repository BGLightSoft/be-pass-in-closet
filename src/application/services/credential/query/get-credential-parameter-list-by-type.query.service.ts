import { Inject, Injectable } from '@nestjs/common';
import { CredentialParameterListModel } from 'src/domain/models/credential/credential-parameter-list.model';
import { ICredentialParameterListRepository } from 'src/domain/repositories/credential/credential-parameter-list.repository.interface';

@Injectable()
export class GetCredentialParameterListByTypeQueryService {
  constructor(
    @Inject(ICredentialParameterListRepository)
    private readonly credentialParameterListRepository: ICredentialParameterListRepository,
  ) {}

  public async execute(
    credentialGroupTypeId: string,
  ): Promise<CredentialParameterListModel[]> {
    return this.credentialParameterListRepository.findByCredentialGroupTypeId(
      credentialGroupTypeId,
    );
  }
}
