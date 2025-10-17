import { Inject, Injectable } from '@nestjs/common';
import { IAccountHasWorkspaceRepository } from 'src/domain/repositories/workspace/account-has-workspace.repository.interface';

@Injectable()
export class CheckUserHasWorkspaceQueryService {
  constructor(
    @Inject(IAccountHasWorkspaceRepository)
    private readonly accountHasWorkspaceRepository: IAccountHasWorkspaceRepository,
  ) {}

  public async execute(accountId: string): Promise<boolean> {
    const count = await this.accountHasWorkspaceRepository.countBy({
      accountId,
    });
    return count > 0;
  }
}
