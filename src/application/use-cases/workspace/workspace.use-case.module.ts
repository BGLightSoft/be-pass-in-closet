import { Module } from '@nestjs/common';
import { CreateWorkspaceCommandUseCase } from './command/create-workspace.command.use-case';
import { UpdateWorkspaceCommandUseCase } from './command/update-workspace.command.use-case';
import { DeleteWorkspaceCommandUseCase } from './command/delete-workspace.command.use-case';
import { GetUserWorkspacesQueryUseCase } from './query/get-user-workspaces.query.use-case';

const query = [GetUserWorkspacesQueryUseCase];

const command = [
  CreateWorkspaceCommandUseCase,
  UpdateWorkspaceCommandUseCase,
  DeleteWorkspaceCommandUseCase,
];

@Module({
  providers: [...query, ...command],
  exports: [...query, ...command],
})
export class WorkspaceUseCaseModule {}
