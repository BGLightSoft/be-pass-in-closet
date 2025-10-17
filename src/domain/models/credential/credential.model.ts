export class CredentialModel {
  public readonly id?: string;
  public readonly credentialGroupId: string | null;
  public readonly name: string | null;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(props: Partial<CredentialModel> = {}) {
    this.id = props.id;
    this.credentialGroupId = props.credentialGroupId ?? null;
    this.name = props.name ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }
}
