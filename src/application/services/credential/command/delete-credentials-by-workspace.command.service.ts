import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ICredentialGroupRepository } from 'src/domain/repositories/credential/credential-group.repository.interface';

@Injectable()
export class DeleteCredentialsByWorkspaceCommandService {
  constructor(
    @Inject(ICredentialGroupRepository)
    private readonly credentialGroupRepository: ICredentialGroupRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    workspaceId: string,
  ): Promise<any> {
    // Soft delete all credential groups in workspace
    return await this.credentialGroupRepository.softDelete(
      { workspaceId },
      queryRunner,
    );
  }
}
