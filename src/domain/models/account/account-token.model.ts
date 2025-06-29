import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';

export class AccountTokenModel {
  public readonly id?: string;

  public readonly accountId: string;
  public readonly type: AccountTokenTypeEnum | null;
  public readonly tokenableId: string | null;
  public readonly token: string | null;
  public readonly expireAt: Date | null;
  public readonly lastUsedAt: Date | null;
  public readonly createdAt: Date;

  constructor(props: Partial<AccountTokenModel> = {}) {
    this.id = props.id;
    this.accountId = props.accountId ?? '';
    this.type = props.type ?? null;
    this.tokenableId = props.tokenableId ?? null;
    this.token = props.token ?? null;
    this.expireAt = props.expireAt ?? null;
    this.lastUsedAt = props.lastUsedAt ?? new Date();
    this.createdAt = props.createdAt ?? new Date();
  }
}
