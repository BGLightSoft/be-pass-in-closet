import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ICredentialGroupRepository } from 'src/domain/repositories/credential/credential-group.repository.interface';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';

@Injectable()
export class UpdateCredentialGroupCommandService {
  constructor(
    @Inject(ICredentialGroupRepository)
    private readonly credentialGroupRepository: ICredentialGroupRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    credentialGroupId: string,
    credentialGroupData: Partial<CredentialGroupModel>,
  ): Promise<any> {
    const updatePayload: Partial<CredentialGroupModel> = {
      ...credentialGroupData,
    };

    return await this.credentialGroupRepository.update(
      { id: credentialGroupId },
      updatePayload as any,
      queryRunner,
    );
  }
}
