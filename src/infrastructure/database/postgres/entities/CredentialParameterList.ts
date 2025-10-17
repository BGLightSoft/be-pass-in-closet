import { Column, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CredentialGroupTypes } from "./CredentialGroupTypes";

@Index(
  "INDEX_credentials_id_credential_group_id",
  ["credentialGroupTypeId", "id"],
  { unique: true }
)
@Index("PK_credential_parameter_list_id", ["id"], { unique: true })
@Entity("credential_parameter_list", { schema: "public" })
export class CredentialParameterList {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "credential_group_type_id", nullable: true })
  credentialGroupTypeId: string | null;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("jsonb", { name: "data", nullable: true })
  data: object | null;

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

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(
    () => CredentialGroupTypes,
    (credentialGroupTypes) => credentialGroupTypes.credentialParameterLists,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "credential_group_type_id", referencedColumnName: "id" },
  ])
  credentialGroupType: CredentialGroupTypes;
}
