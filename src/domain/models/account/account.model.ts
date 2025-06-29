import { RegistrationStatusEnum } from 'src/domain/enums/account/registration-status.enum';

export class AccountModel {
  public readonly id?: string;
  public readonly email: string;
  public readonly password: string | null;
  public readonly isActive: boolean;
  public readonly isFrozen: boolean;
  public readonly registrationStatus: string | null;
  public readonly verifiedAt: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly accountParameters?: any[];

  constructor(props: Partial<AccountModel> = {}) {
    this.id = props.id;
    this.email = props.email!;
    this.password = props.password ?? null;
    this.isActive = props.isActive ?? true;
    this.isFrozen = props.isFrozen ?? false;
    this.registrationStatus =
      props.registrationStatus ?? RegistrationStatusEnum.PENDING;
    this.verifiedAt = props.verifiedAt ?? null;
    this.accountParameters = props.accountParameters;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }
}
