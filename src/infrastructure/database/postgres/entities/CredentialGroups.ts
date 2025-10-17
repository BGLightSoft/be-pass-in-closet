import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CredentialGroupTypes } from "./CredentialGroupTypes";
import { Workspaces } from "./Workspaces";
import { Credentials } from "./Credentials";

@Index(
  "INDEX_credential_groups_workspace_id,credential_group_id",
  ["credentialGroupId", "credentialGroupTypeId", "id", "workspaceId"],
  { unique: true }
)
@Index("PK_credentia_groups_id", ["id"], { unique: true })
@Entity("credential_groups", { schema: "public" })
export class CredentialGroups {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "credential_group_type_id", nullable: true })
  credentialGroupTypeId: string | null;

  @Column("uuid", { name: "credential_group_id", nullable: true })
  credentialGroupId: string | null;

  @Column("uuid", { name: "workspace_id" })
  workspaceId: string;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(
    () => CredentialGroups,
    (credentialGroups) => credentialGroups.credentialGroups,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "credential_group_id", referencedColumnName: "id" }])
  credentialGroup: CredentialGroups;

  @OneToMany(
    () => CredentialGroups,
    (credentialGroups) => credentialGroups.credentialGroup
  )
  credentialGroups: CredentialGroups[];

  @ManyToOne(
    () => CredentialGroupTypes,
    (credentialGroupTypes) => credentialGroupTypes.credentialGroups
  )
  @JoinColumn([
    { name: "credential_group_type_id", referencedColumnName: "id" },
  ])
  credentialGroupType: CredentialGroupTypes;

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.credentialGroups, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "workspace_id", referencedColumnName: "id" }])
  workspace: Workspaces;

  @OneToMany(() => Credentials, (credentials) => credentials.credentialGroup)
  credentials: Credentials[];
}
