export class CredentialGroupModel {
  public readonly id?: string;
  public readonly credentialGroupTypeId: string | null;
  public readonly credentialGroupTypeName?: string | null;
  public readonly credentialGroupId: string | null;
  public readonly workspaceId: string;
  public readonly name: string | null;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(props: Partial<CredentialGroupModel> = {}) {
    this.id = props.id;
    this.credentialGroupTypeId = props.credentialGroupTypeId ?? null;
    this.credentialGroupTypeName = props.credentialGroupTypeName;
    this.credentialGroupId = props.credentialGroupId ?? null;
    this.workspaceId = props.workspaceId!;
    this.name = props.name ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }
}
