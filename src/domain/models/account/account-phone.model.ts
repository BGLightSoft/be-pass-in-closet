export class AccountPhoneModel {
  constructor(props: Partial<AccountPhoneModel> = {}) {
    this.accountId = props.accountId ?? '';
    this.countryCode = props.countryCode ?? null;
    this.phoneNumber = props.phoneNumber ?? null;
    this.verifiedAt = props.verifiedAt ?? null;
    this.isPrimary = props.isPrimary ?? false;
    this.deletedAt = props.deletedAt ?? null;
  }
  public readonly id: string;
  public readonly accountId: string;
  public readonly countryCode: string | null;
  public readonly phoneNumber: string | null;
  public readonly verifiedAt: Date | null;
  public readonly isPrimary: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
}
