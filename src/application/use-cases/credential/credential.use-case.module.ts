import { Module } from '@nestjs/common';
import { CreateCredentialCommandUseCase } from './command/create-credential.command.use-case';
import { UpdateCredentialCommandUseCase } from './command/update-credential.command.use-case';
import { DeleteCredentialCommandUseCase } from './command/delete-credential.command.use-case';
import { GetCredentialsByGroupQueryUseCase } from './query/get-credentials-by-group.query.use-case';
import { GetCredentialParameterListByTypeQueryUseCase } from './query/get-credential-parameter-list-by-type.query.use-case';
import { UpdateCredentialOrderCommandUseCase } from './command/update-credential-order.command.use-case';

const query = [
  GetCredentialsByGroupQueryUseCase,
  GetCredentialParameterListByTypeQueryUseCase,
];

const command = [
  CreateCredentialCommandUseCase,
  UpdateCredentialCommandUseCase,
  DeleteCredentialCommandUseCase,
  UpdateCredentialOrderCommandUseCase,
];

@Module({
  providers: [...query, ...command],
  exports: [...query, ...command],
})
export class CredentialUseCaseModule {}
