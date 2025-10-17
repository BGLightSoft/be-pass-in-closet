import { Module } from '@nestjs/common';
import { IWorkspaceRepository } from 'src/domain/repositories/workspace/workspace.repository.interface';
import { WorkspaceRepository } from './workspace.repository';
import { IAccountHasWorkspaceRepository } from 'src/domain/repositories/workspace/account-has-workspace.repository.interface';
import { AccountHasWorkspaceRepository } from './account-has-workspace.repository';

const providers = [
  {
    provide: IWorkspaceRepository,
    useClass: WorkspaceRepository,
  },
  {
    provide: IAccountHasWorkspaceRepository,
    useClass: AccountHasWorkspaceRepository,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class WorkspaceInfrastructureRepositoriesModule {}
