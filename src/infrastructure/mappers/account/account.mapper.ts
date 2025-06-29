import { IMapper } from 'src/domain/mapper/mapper.interface';
import { AccountModel } from 'src/domain/models/account/account.model';
import { Accounts } from '../../database/postgres/entities/Accounts';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AccountMapper implements IMapper<Accounts, AccountModel> {
  toDomain(entity: Accounts): AccountModel {
    return new AccountModel({
      id: entity.id,
      email: entity.email,
      password: entity.password,
      isActive: entity.isActive === true,
      isFrozen: entity.isFrozen === true,
      registrationStatus: entity.registrationStatus,
      verifiedAt: entity.verifiedAt ? new Date(entity.verifiedAt) : null,
      accountParameters: entity.accountParameters,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt) : new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    });
  }

  toEntity(domain: AccountModel): Accounts {
    const entity = new Accounts();
    entity.email = domain.email;
    entity.password = domain.password;
    entity.isActive = domain.isActive ? true : false;
    entity.isFrozen = domain.isFrozen ? true : false;
    entity.registrationStatus = domain.registrationStatus;
    entity.verifiedAt = domain.verifiedAt ?? null;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}
