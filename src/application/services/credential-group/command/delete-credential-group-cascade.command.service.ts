import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ICredentialGroupRepository } from 'src/domain/repositories/credential/credential-group.repository.interface';

@Injectable()
export class DeleteCredentialGroupCascadeCommandService {
  constructor(
    @Inject(ICredentialGroupRepository)
    private readonly credentialGroupRepository: ICredentialGroupRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    credentialGroupId: string,
  ): Promise<any> {
    // Soft delete all child groups
    return await this.credentialGroupRepository.softDelete(
      { credentialGroupId },
      queryRunner,
    );
  }
}
