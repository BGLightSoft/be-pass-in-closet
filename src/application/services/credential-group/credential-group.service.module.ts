import { Module } from '@nestjs/common';
import { CreateCredentialGroupCommandService } from './command/create-credential-group.command.service';
import { UpdateCredentialGroupCommandService } from './command/update-credential-group.command.service';
import { DeleteCredentialGroupCommandService } from './command/delete-credential-group.command.service';
import { GetCredentialGroupTypeByNameQueryService } from './query/get-credential-group-type-by-name.query.service';
import { GetCredentialGroupByIdQueryService } from './query/get-credential-group-by-id.query.service';
import { GetCredentialGroupsByWorkspaceQueryService } from './query/get-credential-groups-by-workspace.query.service';
import { GetCredentialGroupsByParentQueryService } from './query/get-credential-groups-by-parent.query.service';

const command = [
  CreateCredentialGroupCommandService,
  UpdateCredentialGroupCommandService,
  DeleteCredentialGroupCommandService,
];

const query = [
  GetCredentialGroupTypeByNameQueryService,
  GetCredentialGroupByIdQueryService,
  GetCredentialGroupsByWorkspaceQueryService,
  GetCredentialGroupsByParentQueryService,
];

@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class CredentialGroupServiceModule {}
