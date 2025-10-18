import { Inject, Injectable } from '@nestjs/common';
import { IAccountHasWorkspaceRepository } from 'src/domain/repositories/workspace/account-has-workspace.repository.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class ResetAccountWorkspacesDefaultStatusCommandService {
  constructor(
    @Inject(IAccountHasWorkspaceRepository)
    private readonly accountHasWorkspaceRepository: IAccountHasWorkspaceRepository,
  ) {}

  async execute(accountId: string, queryRunner: QueryRunner): Promise<void> {
    await this.accountHasWorkspaceRepository.updateDefaultStatusByAccount(
      accountId,
      false,
      queryRunner,
    );
  }
}
