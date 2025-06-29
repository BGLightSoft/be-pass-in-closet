import { Global, Module } from '@nestjs/common';
import { InfrastructureRepositoriesModule } from './repositories/infrastructure.repositories.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { InfrastructureMapperModule } from './mappers/infrastructure.mapper.module';
import { InfrastructureNotificationModule } from './notification/infrastructure.notification.module';

@Global()
@Module({
  imports: [
    PostgresModule,
    InfrastructureMapperModule,
    InfrastructureRepositoriesModule,
    InfrastructureNotificationModule,
  ],
  exports: [
    PostgresModule,
    InfrastructureMapperModule,
    InfrastructureNotificationModule,
    InfrastructureRepositoriesModule,
  ],
})
export class InfrastructureModule { }
