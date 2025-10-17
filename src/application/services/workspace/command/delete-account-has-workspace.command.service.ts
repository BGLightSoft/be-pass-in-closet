import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IAccountHasWorkspaceRepository } from 'src/domain/repositories/workspace/account-has-workspace.repository.interface';

@Injectable()
export class DeleteAccountHasWorkspaceCommandService {
  constructor(
    @Inject(IAccountHasWorkspaceRepository)
    private readonly accountHasWorkspaceRepository: IAccountHasWorkspaceRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    workspaceId: string,
  ): Promise<any> {
    return await this.accountHasWorkspaceRepository.delete({ workspaceId });
  }
}
