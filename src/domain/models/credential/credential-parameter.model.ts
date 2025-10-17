export class CredentialParameterModel {
  public readonly id?: string;
  public readonly credentialId: string | null;
  public readonly name: string | null;
  public readonly data: object | null;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(props: Partial<CredentialParameterModel> = {}) {
    this.id = props.id;
    this.credentialId = props.credentialId ?? null;
    this.name = props.name ?? null;
    this.data = props.data ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }
}
