import { Global, Module } from '@nestjs/common';
import { AccountMapper } from 'src/infrastructure/mappers/account/account.mapper';

const mappers = [AccountMapper];
@Global()
@Module({
  providers: [...mappers],
  exports: [...mappers],
})
export class AccountsInfrastructureMapperModule {}
