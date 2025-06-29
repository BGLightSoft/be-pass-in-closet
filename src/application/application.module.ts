import { Global, Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { UseCaseModule } from './use-cases/use-case.module';

@Global()
@Module({
  imports: [ServicesModule, UseCaseModule],
  exports: [ServicesModule, UseCaseModule],
})
export class ApplicationModule {}
