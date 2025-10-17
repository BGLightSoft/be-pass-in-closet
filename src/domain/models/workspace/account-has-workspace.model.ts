export class AccountHasWorkspaceModel {
  public readonly id?: string;
  public readonly accountId: string | null;
  public readonly workspaceId: string | null;
  public readonly isDefault: boolean;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(props: Partial<AccountHasWorkspaceModel> = {}) {
    this.id = props.id;
    this.accountId = props.accountId ?? null;
    this.workspaceId = props.workspaceId ?? null;
    this.isDefault = props.isDefault ?? false;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }
}
