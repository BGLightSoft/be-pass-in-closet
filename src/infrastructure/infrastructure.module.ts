import { Global, Module } from '@nestjs/common';
import { InfrastructureRepositoriesModule } from './repositories/infrastructure.repositories.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { InfrastructureNotificationModule } from './notification/infrastructure.notification.module';

@Global()
@Module({
  imports: [
    PostgresModule,
    InfrastructureRepositoriesModule,
    InfrastructureNotificationModule,
  ],
  exports: [
    PostgresModule,
    InfrastructureNotificationModule,
    InfrastructureRepositoriesModule,
  ],
})
export class InfrastructureModule {}
