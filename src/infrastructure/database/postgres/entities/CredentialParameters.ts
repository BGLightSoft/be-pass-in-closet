import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Credentials } from "./Credentials";

@Index("INDEX_credential_parameters_credential_id", ["credentialId", "name"], {
  unique: true,
})
@Index("PK_credential_parameters_id", ["id"], { unique: true })
@Entity("credential_parameters", { schema: "public" })
export class CredentialParameters {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "credential_id", nullable: true })
  credentialId: string | null;

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

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(
    () => Credentials,
    (credentials) => credentials.credentialParameters,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "credential_id", referencedColumnName: "id" }])
  credential: Credentials;
}
