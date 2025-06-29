export class AuditLogModel {
  public readonly accountId: string;
  public readonly interactionTypes: string | null;
  public readonly data: Record<string, any> | null;
  public readonly createdAt: Date;

  constructor(props: Partial<AuditLogModel> = {}) {
    this.accountId = props.accountId ?? '';
    this.interactionTypes = props.interactionTypes ?? null;
    this.data = props.data ?? null;
    this.createdAt = props.createdAt ?? new Date();
  }
}
