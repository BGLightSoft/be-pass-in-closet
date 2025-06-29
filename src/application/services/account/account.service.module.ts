import { Module } from '@nestjs/common';
import { CreateAccountCommandService } from './command/create-account.command.service';
import { CreateAccountParameterCommandService } from './command/create-account-parameter.command.service';
import { GetAllAccountsQueryService } from './query/get-all-accounts.query.service';
import { UpdateAccountCommandService } from './command/update-account.command.service';
import { GetOneAccountByIdQueryService } from './query/get-one-account-by-id.query.service';
import { GetAcountParameterByNameQueryService } from './query/get-account-parameter-by-name.query.service';
import { UpdateAccountParameterCommandService } from './command/update-account-parameter.command.service';
import { DeleteAccountCommandService } from './command/delete-account.command.service';
import { GetAccountByEmailQueryService } from './query/get-account-by-email.query.service';
import { FindAccountTokenQueryService } from './query/find-account-tokens.query.service';
import { UpdateAccountPasswordCommandService } from './command/update-account-password.command.service';
import { GetAccountNameQueryService } from './query/get-account-name.query.service';
const command = [
  CreateAccountCommandService,
  CreateAccountParameterCommandService,
  UpdateAccountCommandService,
  UpdateAccountParameterCommandService,
  DeleteAccountCommandService,
  UpdateAccountPasswordCommandService,
];

const query = [
  GetAllAccountsQueryService,
  GetOneAccountByIdQueryService,
  GetAcountParameterByNameQueryService,
  GetAccountByEmailQueryService,
  FindAccountTokenQueryService,
  GetAccountNameQueryService,
];
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class AccountServiceModule { }
