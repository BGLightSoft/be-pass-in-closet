import { Module } from '@nestjs/common';
import { GetAllAccountQueryUseCase } from './query/get-all-account.query.use-case';
import { UpdateAccountRegistrationStatusCommandUseCase } from './command/update-account-registration-status.command.use-case';
import { UpdateAccountCommandUseCase } from './command/update-account.command.use-case';
import { DeleteAccountCommandUseCase } from './command/delete-account.command.use-case';
import { GetOneAccountByIdQueryUseCase } from './query/get-one-account-by-id.query.use-case';
import { UpdateAccountPasswordCommandUseCase } from './command/update-account-password.command.use-case';
import { GetMyAccountByIdQueryUseCase } from './query/get-my-account-by-id.query.use-case';

const query = [
  GetAllAccountQueryUseCase,
  GetOneAccountByIdQueryUseCase,
  GetMyAccountByIdQueryUseCase,
];
const command = [
  UpdateAccountRegistrationStatusCommandUseCase,
  UpdateAccountCommandUseCase,
  DeleteAccountCommandUseCase,
  UpdateAccountPasswordCommandUseCase,
];
@Module({
  providers: [...query, ...command],
  exports: [...query, ...command],
})
export class AccountUseCaseModule { }
