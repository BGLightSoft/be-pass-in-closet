import { Column, DeleteDateColumn, Entity, Index, OneToMany } from "typeorm";
import { CredentialGroups } from "./CredentialGroups";
import { CredentialParameterList } from "./CredentialParameterList";

@Index("PK_credential_group_type_id", ["id"], { unique: true })
@Entity("credential_group_types", { schema: "public" })
export class CredentialGroupTypes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

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

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => CredentialGroups,
    (credentialGroups) => credentialGroups.credentialGroupType
  )
  credentialGroups: CredentialGroups[];

  @OneToMany(
    () => CredentialParameterList,
    (credentialParameterList) => credentialParameterList.credentialGroupType
  )
  credentialParameterLists: CredentialParameterList[];
}
