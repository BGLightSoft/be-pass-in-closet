import { IMapper } from 'src/domain/mapper/mapper.interface';
import { AccountPhoneModel } from 'src/domain/models/account/account-phone.model';
import { AccountPhones } from 'src/infrastructure/database/postgres/entities/AccountPhones';

export class AccountPhoneMapper
  implements IMapper<AccountPhones, AccountPhoneModel>
{
  toDomain(entity: AccountPhones): AccountPhoneModel {
    return new AccountPhoneModel({
      accountId: entity.accountId ?? '',
      countryCode: entity.countryCode,
      phoneNumber: entity.phoneNumber,
      verifiedAt: entity.verifiedAt ? new Date(entity.verifiedAt) : null,
      isPrimary: entity.isPrimary ?? false,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
      updatedAt: entity.updatedAt ? new Date(entity.updatedAt) : new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    });
  }

  toEntity(domain: AccountPhoneModel): AccountPhones {
    const entity = new AccountPhones();
    entity.id = domain.id;
    entity.accountId = domain.accountId;
    entity.countryCode = domain.countryCode;
    entity.phoneNumber = domain.phoneNumber;
    entity.verifiedAt = domain.verifiedAt
      ? domain.verifiedAt.toISOString().split('T')[0]
      : null;
    entity.isPrimary = domain.isPrimary;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt ?? null;
    entity.account = { id: domain.accountId } as any;
    return entity;
  }
}
