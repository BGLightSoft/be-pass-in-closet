import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ICredentialRepository } from 'src/domain/repositories/credential/credential.repository.interface';
import { CredentialModel } from 'src/domain/models/credential/credential.model';

@Injectable()
export class CreateCredentialCommandService {
  constructor(
    @Inject(ICredentialRepository)
    private readonly credentialRepository: ICredentialRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    credentialData: Partial<CredentialModel>,
  ): Promise<CredentialModel> {
    return await this.credentialRepository.save(
      credentialData,
      undefined,
      queryRunner,
    );
  }
}
