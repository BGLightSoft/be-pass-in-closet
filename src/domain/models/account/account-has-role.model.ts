export class AccountHasRoleModel {
  public readonly id: string;
  public readonly accountId: string;
  public readonly roleId: string;
  public readonly roles?: any;
  public readonly createdAt: Date;

  constructor(props: Partial<AccountHasRoleModel> = {}) {
    this.accountId = props.accountId ?? '';
    this.roleId = props.roleId ?? '';
    this.roles = props.roles;
  }
}
