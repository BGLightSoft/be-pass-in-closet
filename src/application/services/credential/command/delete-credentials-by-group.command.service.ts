import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ICredentialRepository } from 'src/domain/repositories/credential/credential.repository.interface';

@Injectable()
export class DeleteCredentialsByGroupCommandService {
  constructor(
    @Inject(ICredentialRepository)
    private readonly credentialRepository: ICredentialRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    credentialGroupId: string,
  ): Promise<any> {
    return await this.credentialRepository.softDelete(
      { credentialGroupId },
      queryRunner,
    );
  }
}
