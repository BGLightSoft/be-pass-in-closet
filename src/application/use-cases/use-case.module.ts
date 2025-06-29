import { Module } from '@nestjs/common';
import { AuthUseCaseModule } from './auth/auth.use-case.module';
import { AccountUseCaseModule } from './account/account.use-case.module';

@Module({
  imports: [
    AuthUseCaseModule,
    AccountUseCaseModule,
  ],
  exports: [
    AuthUseCaseModule,
    AccountUseCaseModule,
  ],
})
export class UseCaseModule { }
