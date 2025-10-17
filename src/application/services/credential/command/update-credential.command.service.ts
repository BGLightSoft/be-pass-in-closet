import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ICredentialRepository } from 'src/domain/repositories/credential/credential.repository.interface';
import { CredentialModel } from 'src/domain/models/credential/credential.model';

@Injectable()
export class UpdateCredentialCommandService {
  constructor(
    @Inject(ICredentialRepository)
    private readonly credentialRepository: ICredentialRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    credentialId: string,
    credentialData: Partial<CredentialModel>,
  ): Promise<any> {
    const updatePayload: Partial<CredentialModel> = {
      ...credentialData,
    };

    return await this.credentialRepository.update(
      { id: credentialId },
      updatePayload as any,
      queryRunner,
    );
  }
}
