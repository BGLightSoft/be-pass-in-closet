import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CredentialParameters } from "./CredentialParameters";
import { CredentialGroups } from "./CredentialGroups";

@Index("INDEX_credentials_credential_group_id", ["credentialGroupId", "id"], {
  unique: true,
})
@Index("PK_credentials_id", ["id"], { unique: true })
@Entity("credentials", { schema: "public" })
export class Credentials {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "credential_group_id", nullable: true })
  credentialGroupId: string | null;

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

  @OneToMany(
    () => CredentialParameters,
    (credentialParameters) => credentialParameters.credential
  )
  credentialParameters: CredentialParameters[];

  @ManyToOne(
    () => CredentialGroups,
    (credentialGroups) => credentialGroups.credentials,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "credential_group_id", referencedColumnName: "id" }])
  credentialGroup: CredentialGroups;
}
