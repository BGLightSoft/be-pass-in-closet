import { Module } from '@nestjs/common';
import { CreateWorkspaceCommandService } from './command/create-workspace.command.service';
import { CreateAccountHasWorkspaceCommandService } from './command/create-account-has-workspace.command.service';
import { UpdateWorkspaceCommandService } from './command/update-workspace.command.service';
import { DeleteWorkspaceCommandService } from './command/delete-workspace.command.service';
import { DeleteAccountHasWorkspaceCommandService } from './command/delete-account-has-workspace.command.service';
import { ResetAccountWorkspacesDefaultStatusCommandService } from './command/reset-account-workspaces-default-status.command.service';
import { UpdateAccountWorkspaceDefaultStatusCommandService } from './command/update-account-workspace-default-status.command.service';
import { GetWorkspaceByIdQueryService } from './query/get-workspace-by-id.query.service';
import { GetUserWorkspacesQueryService } from './query/get-user-workspaces.query.service';
import { CheckUserHasWorkspaceQueryService } from './query/check-user-has-workspace.query.service';
import { GetAccountHasWorkspaceQueryService } from './query/get-account-has-workspace.query.service';

const command = [
  CreateWorkspaceCommandService,
  CreateAccountHasWorkspaceCommandService,
  UpdateWorkspaceCommandService,
  DeleteWorkspaceCommandService,
  DeleteAccountHasWorkspaceCommandService,
  ResetAccountWorkspacesDefaultStatusCommandService,
  UpdateAccountWorkspaceDefaultStatusCommandService,
];

const query = [
  GetWorkspaceByIdQueryService,
  GetUserWorkspacesQueryService,
  CheckUserHasWorkspaceQueryService,
  GetAccountHasWorkspaceQueryService,
];

@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class WorkspaceServiceModule {}
