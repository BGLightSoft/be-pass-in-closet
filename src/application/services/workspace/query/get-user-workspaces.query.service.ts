import { Inject, Injectable } from '@nestjs/common';
import { AccountHasWorkspaceModel } from 'src/domain/models/workspace/account-has-workspace.model';
import { IAccountHasWorkspaceRepository } from 'src/domain/repositories/workspace/account-has-workspace.repository.interface';

@Injectable()
export class GetUserWorkspacesQueryService {
  constructor(
    @Inject(IAccountHasWorkspaceRepository)
    private readonly accountHasWorkspaceRepository: IAccountHasWorkspaceRepository,
  ) {}

  public async execute(accountId: string): Promise<AccountHasWorkspaceModel[]> {
    return this.accountHasWorkspaceRepository.findByAccountId(accountId);
  }
}
