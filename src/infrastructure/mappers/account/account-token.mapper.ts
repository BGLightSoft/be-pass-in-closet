import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { IMapper } from 'src/domain/mapper/mapper.interface';
import { AccountTokenModel } from 'src/domain/models/account/account-token.model';
import { AccountTokens } from 'src/infrastructure/database/postgres/entities/AccountTokens';

export class AccountTokenMapper
  implements IMapper<AccountTokens, AccountTokenModel>
{
  toDomain(entity: AccountTokens): AccountTokenModel {
    return new AccountTokenModel({
      id: entity.id,
      accountId: entity.accounts?.id ?? '',
      type: entity.type as AccountTokenTypeEnum,
      tokenableId: entity.tokenableId,
      token: entity.token,
      expireAt: entity.expireAt ? new Date(entity.expireAt) : null,
      lastUsedAt: entity.lastUsedAt ? new Date(entity.lastUsedAt) : null,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
    });
  }

  toEntity(domain: AccountTokenModel): AccountTokens {
    const entity = new AccountTokens();
    entity.type = domain.type;
    entity.tokenableId = domain.tokenableId;
    entity.token = domain.token;
    entity.expireAt = domain.expireAt ?? null;
    entity.lastUsedAt = domain.lastUsedAt ?? null;
    entity.createdAt = domain.createdAt;
    entity.accounts = { id: domain.accountId } as any;
    return entity;
  }
}
