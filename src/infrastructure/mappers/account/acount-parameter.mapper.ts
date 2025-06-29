import { IMapper } from 'src/domain/mapper/mapper.interface';
import { AccountParameterModel } from 'src/domain/models/account/account-parameter.model';
import { AccountParameters } from 'src/infrastructure/database/postgres/entities/AccountParameters';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountParameterMapper
  implements IMapper<AccountParameters, AccountParameterModel>
{
  toDomain(entity: AccountParameters): AccountParameterModel {
    return new AccountParameterModel({
      id: entity.id,
      accountId: entity.accountId,
      name: entity.name,
      data: entity.data,
      isActive: entity.isActive ?? true,
      createdAt: entity.createdAt ?? new Date(),
      updatedAt: entity.updatedAt ?? new Date(),
      deletedAt: entity.deletedAt ?? null,
    });
  }

  toEntity(model: AccountParameterModel): AccountParameters {
    const entity = new AccountParameters();

    if (model.id) {
      entity.id = model.id;
    }

    entity.accountId = model.accountId;
    entity.name = model.name;
    entity.data = model.data;
    entity.isActive = model.isActive;
    entity.createdAt = model.createdAt;
    entity.updatedAt = model.updatedAt;
    entity.deletedAt = model.deletedAt;

    return entity;
  }
}
