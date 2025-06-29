import { Module } from '@nestjs/common';
import { IApplicationErrorRepository } from 'src/domain/repositories/log/application-error.repository.interface';
import { ApplicationErrorRepository } from './application-error.repository';
import { IAuditLogRepository } from 'src/domain/repositories/log/audit-log.repository.interface';
import { AuditLogRepository } from './audit-log.repository';

const providers = [
  {
    provide: IApplicationErrorRepository,
    useClass: ApplicationErrorRepository,
  },
  {
    provide: IAuditLogRepository,
    useClass: AuditLogRepository,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class LogsInfrastructureRepositoriesModule { }
