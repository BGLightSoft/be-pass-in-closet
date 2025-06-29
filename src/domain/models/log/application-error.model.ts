export class ApplicationErrorModel {
  public readonly accountId: string;
  public readonly type: string | null;
  public readonly message: string | null;
  public readonly createdAt: Date;

  constructor(props: Partial<ApplicationErrorModel> = {}) {
    this.accountId = props.accountId ?? '';
    this.type = props.type ?? null;
    this.message = props.message ?? null;
    this.createdAt = props.createdAt ?? new Date();
  }
}
