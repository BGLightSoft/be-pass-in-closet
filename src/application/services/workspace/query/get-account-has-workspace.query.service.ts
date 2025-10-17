import { Inject, Injectable } from '@nestjs/common';
import { AccountHasWorkspaceModel } from 'src/domain/models/workspace/account-has-workspace.model';
import { IAccountHasWorkspaceRepository } from 'src/domain/repositories/workspace/account-has-workspace.repository.interface';

@Injectable()
export class GetAccountHasWorkspaceQueryService {
  constructor(
    @Inject(IAccountHasWorkspaceRepository)
    private readonly accountHasWorkspaceRepository: IAccountHasWorkspaceRepository,
  ) {}

  public async execute(
    accountId: string,
    workspaceId: string,
  ): Promise<AccountHasWorkspaceModel | null> {
    return this.accountHasWorkspaceRepository.findByAccountIdAndWorkspaceId(
      accountId,
      workspaceId,
    );
  }
}
