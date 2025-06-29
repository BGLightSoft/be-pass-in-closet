import { Module } from '@nestjs/common';
import { CreateTokenCommandService } from '../account-tokens/command/create-token.command.service';
import { GetAccountTokenQueryService } from './query/get-account-token.query.service';
import { DeleteTokenCommandService } from './command/delete-token.command.service';
import { DeleteAuthtokensCommandService } from './command/delete-auth-tokens.command.service';
import { CreateAuthtokensCommandService } from './command/create-auth-tokens.command.service';
import { DeleteTokenByTypeCommandService } from './command/delete-token-by-type.command.service';

const command = [
  CreateTokenCommandService,
  DeleteTokenCommandService,
  DeleteAuthtokensCommandService,
  CreateAuthtokensCommandService,
  DeleteTokenByTypeCommandService,
];
const query = [GetAccountTokenQueryService];

@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class AccountTokensServiceModule {}
