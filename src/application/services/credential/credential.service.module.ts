import { Module } from '@nestjs/common';
import { CreateCredentialCommandService } from './command/create-credential.command.service';
import { CreateCredentialParameterCommandService } from './command/create-credential-parameter.command.service';
import { UpdateCredentialCommandService } from './command/update-credential.command.service';
import { UpdateCredentialParameterCommandService } from './command/update-credential-parameter.command.service';
import { DeleteCredentialCommandService } from './command/delete-credential.command.service';
import { GetCredentialByIdQueryService } from './query/get-credential-by-id.query.service';
import { GetCredentialsByGroupQueryService } from './query/get-credentials-by-group.query.service';
import { GetCredentialParameterListByTypeQueryService } from './query/get-credential-parameter-list-by-type.query.service';
import { GetCredentialParametersQueryService } from './query/get-credential-parameters.query.service';

import { DeleteCredentialParametersCommandService } from './command/delete-credential-parameters.command.service';
import { DeleteCredentialsByGroupCommandService } from './command/delete-credentials-by-group.command.service';
import { DeleteCredentialsByWorkspaceCommandService } from './command/delete-credentials-by-workspace.command.service';

const command = [
  CreateCredentialCommandService,
  CreateCredentialParameterCommandService,
  UpdateCredentialCommandService,
  UpdateCredentialParameterCommandService,
  DeleteCredentialCommandService,
  DeleteCredentialParametersCommandService,
  DeleteCredentialsByGroupCommandService,
  DeleteCredentialsByWorkspaceCommandService,
];

const query = [
  GetCredentialByIdQueryService,
  GetCredentialsByGroupQueryService,
  GetCredentialParameterListByTypeQueryService,
  GetCredentialParametersQueryService,
];

@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class CredentialServiceModule {}
