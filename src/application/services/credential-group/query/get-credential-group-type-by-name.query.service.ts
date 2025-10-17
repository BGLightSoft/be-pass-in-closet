import { Inject, Injectable } from '@nestjs/common';
import { CredentialGroupTypeModel } from 'src/domain/models/credential/credential-group-type.model';
import { ICredentialGroupTypeRepository } from 'src/domain/repositories/credential/credential-group-type.repository.interface';

@Injectable()
export class GetCredentialGroupTypeByNameQueryService {
  constructor(
    @Inject(ICredentialGroupTypeRepository)
    private readonly credentialGroupTypeRepository: ICredentialGroupTypeRepository,
  ) {}

  public async execute(name: string): Promise<CredentialGroupTypeModel | null> {
    return this.credentialGroupTypeRepository.findByName(name);
  }
}
