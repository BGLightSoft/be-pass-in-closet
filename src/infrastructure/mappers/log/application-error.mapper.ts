import { ApplicationErrorModel } from 'src/domain/models/log/application-error.model';
import { ApplicationErrors } from '../../database/postgres/entities/ApplicationErrors';
import { IMapper } from 'src/domain/mapper/mapper.interface';

export class ApplicationErrorMapper
  implements IMapper<ApplicationErrors, ApplicationErrorModel>
{
  toDomain(entity: ApplicationErrors): ApplicationErrorModel {
    return new ApplicationErrorModel({
      accountId: entity.account?.id ?? '',
      type: entity.type,
      message: entity.message,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
    });
  }

  toEntity(domain: ApplicationErrorModel): ApplicationErrors {
    const entity = new ApplicationErrors();
    entity.type = domain.type;
    entity.message = domain.message;
    entity.createdAt = domain.createdAt;
    entity.account = { id: domain.accountId } as any;
    return entity;
  }
}
