import { Module } from '@nestjs/common';
import { AccountsInfrastructureMapperModule } from './account/account.infrastructure.mapper.module';

@Module({
  providers: [AccountsInfrastructureMapperModule],
  exports: [AccountsInfrastructureMapperModule],
})
export class InfrastructureMapperModule {}
