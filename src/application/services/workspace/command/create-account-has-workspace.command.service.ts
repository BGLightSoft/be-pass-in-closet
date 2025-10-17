import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IAccountHasWorkspaceRepository } from 'src/domain/repositories/workspace/account-has-workspace.repository.interface';
import { AccountHasWorkspaceModel } from 'src/domain/models/workspace/account-has-workspace.model';

@Injectable()
export class CreateAccountHasWorkspaceCommandService {
  constructor(
    @Inject(IAccountHasWorkspaceRepository)
    private readonly accountHasWorkspaceRepository: IAccountHasWorkspaceRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    data: Partial<AccountHasWorkspaceModel>,
  ): Promise<AccountHasWorkspaceModel> {
    return await this.accountHasWorkspaceRepository.save(
      data,
      undefined,
      queryRunner,
    );
  }
}
