export class AccountParameterModel {
  public readonly id?: string;
  public readonly accountId: string;
  public readonly name: string | null;
  public readonly data: Record<string, any> | null;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(props: Partial<AccountParameterModel> = {}) {
    this.id = props.id;
    this.accountId = props.accountId ?? '';
    this.name = props.name ?? null;
    this.data = props.data ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }
}
