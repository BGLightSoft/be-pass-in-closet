import { Inject, Injectable } from '@nestjs/common';
import { IAccountHasWorkspaceRepository } from 'src/domain/repositories/workspace/account-has-workspace.repository.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class UpdateAccountWorkspaceDefaultStatusCommandService {
  constructor(
    @Inject(IAccountHasWorkspaceRepository)
    private readonly accountHasWorkspaceRepository: IAccountHasWorkspaceRepository,
  ) {}

  async execute(
    accountId: string,
    workspaceId: string,
    isDefault: boolean,
    queryRunner: QueryRunner,
  ): Promise<void> {
    await this.accountHasWorkspaceRepository.updateDefaultStatus(
      accountId,
      workspaceId,
      isDefault,
      queryRunner,
    );
  }
}
