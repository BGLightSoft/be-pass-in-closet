import { AuditLogModel } from 'src/domain/models/log/audit-log.model';
import { IBaseRepository } from '../base.repository.interface';
import { AuditLogs } from 'src/infrastructure/database/postgres/entities/AuditLogs';

export interface IAuditLogRepository
  extends IBaseRepository<AuditLogs, AuditLogModel> {}

export const IAuditLogRepository = Symbol('IAuditLogRepository');
