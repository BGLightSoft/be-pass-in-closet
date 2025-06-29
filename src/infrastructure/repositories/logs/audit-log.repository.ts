import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../base/base-repository';
import { IAuditLogRepository } from 'src/domain/repositories/log/audit-log.repository.interface';
import { AuditLogs } from 'src/infrastructure/database/postgres/entities/AuditLogs';
import { AuditLogModel } from 'src/domain/models/log/audit-log.model';
import { AuditLogMapper } from 'src/infrastructure/mappers/log/audit-log.mapper';

@Injectable()
export class AuditLogRepository
  extends BaseRepository<AuditLogs, AuditLogModel>
  implements IAuditLogRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, AuditLogs, new AuditLogMapper());
  }
}
