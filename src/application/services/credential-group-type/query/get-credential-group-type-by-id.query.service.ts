import { Inject, Injectable } from '@nestjs/common';
import { CredentialGroupTypeModel } from 'src/domain/models/credential/credential-group-type.model';
import { ICredentialGroupTypeRepository } from 'src/domain/repositories/credential/credential-group-type.repository.interface';

@Injectable()
export class GetCredentialGroupTypeByIdQueryService {
  constructor(
    @Inject(ICredentialGroupTypeRepository)
    private readonly credentialGroupTypeRepository: ICredentialGroupTypeRepository,
  ) {}

  public async execute(id: string): Promise<CredentialGroupTypeModel | null> {
    return this.credentialGroupTypeRepository.findOneBy({ id } as any);
  }
}
