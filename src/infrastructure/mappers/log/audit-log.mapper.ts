import { AuditLogModel } from 'src/domain/models/log/audit-log.model';
import { AuditLogs } from '../../database/postgres/entities/AuditLogs';
import { IMapper } from 'src/domain/mapper/mapper.interface';

export class AuditLogMapper implements IMapper<AuditLogs, AuditLogModel> {
  toDomain(entity: AuditLogs): AuditLogModel {
    return new AuditLogModel({
      accountId: entity.accounts?.id ?? '',
      interactionTypes: entity.interactionTypes,
      data: (entity.data as Record<string, any>) ?? null,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
    });
  }

  toEntity(domain: AuditLogModel): AuditLogs {
    const entity = new AuditLogs();
    entity.interactionTypes = domain.interactionTypes;
    entity.data = domain.data;
    entity.createdAt = domain.createdAt;
    entity.accounts = { id: domain.accountId } as any;
    return entity;
  }
}
