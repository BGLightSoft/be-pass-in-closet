import { Module } from '@nestjs/common';
import { IAccountRepository } from 'src/domain/repositories/account/account.repository.interface';
import { AccountRepository } from './account.repository';
import { IAccountParameterRepository } from 'src/domain/repositories/account/account-parameter.repository.interface';
import { AccountParameterRepository } from './account-parameter.repository';
import { IAccountPhoneRepository } from 'src/domain/repositories/account/account-phone.repository.interface';
import { AccountPhoneRepository } from './account-phone.repository';
import { IAccountTokenRepository } from 'src/domain/repositories/account/account-token-repository.interface';
import { AccountTokenRepository } from './account-token.repository';
const providers = [
  {
    provide: IAccountParameterRepository,
    useClass: AccountParameterRepository,
  },
  {
    provide: IAccountPhoneRepository,
    useClass: AccountPhoneRepository,
  },
  {
    provide: IAccountTokenRepository,
    useClass: AccountTokenRepository,
  },
  {
    provide: IAccountRepository,
    useClass: AccountRepository,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class AccountsInfrastructureRepositoriesModule { }
