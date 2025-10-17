import { Module } from '@nestjs/common';
import { CreateCredentialGroupCommandUseCase } from './command/create-credential-group.command.use-case';
import { UpdateCredentialGroupCommandUseCase } from './command/update-credential-group.command.use-case';
import { DeleteCredentialGroupCommandUseCase } from './command/delete-credential-group.command.use-case';
import { GetCredentialGroupsQueryUseCase } from './query/get-credential-groups.query.use-case';

const query = [GetCredentialGroupsQueryUseCase];

const command = [
  CreateCredentialGroupCommandUseCase,
  UpdateCredentialGroupCommandUseCase,
  DeleteCredentialGroupCommandUseCase,
];

@Module({
  providers: [...query, ...command],
  exports: [...query, ...command],
})
export class CredentialGroupUseCaseModule {}
