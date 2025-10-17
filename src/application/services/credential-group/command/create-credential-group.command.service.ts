import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ICredentialGroupRepository } from 'src/domain/repositories/credential/credential-group.repository.interface';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';

@Injectable()
export class CreateCredentialGroupCommandService {
  constructor(
    @Inject(ICredentialGroupRepository)
    private readonly credentialGroupRepository: ICredentialGroupRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    credentialGroupData: Partial<CredentialGroupModel>,
  ): Promise<CredentialGroupModel> {
    return await this.credentialGroupRepository.save(
      credentialGroupData,
      undefined,
      queryRunner,
    );
  }
}
