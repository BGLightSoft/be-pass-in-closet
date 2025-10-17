import { Column, DeleteDateColumn, Entity, Index, OneToMany } from "typeorm";
import { AccountHasWorkspaces } from "./AccountHasWorkspaces";
import { CredentialGroups } from "./CredentialGroups";

@Index("PK_workpsace_id", ["id"], { unique: true })
@Entity("workspaces", { schema: "public" })
export class Workspaces {
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
    () => AccountHasWorkspaces,
    (accountHasWorkspaces) => accountHasWorkspaces.workspace
  )
  accountHasWorkspaces: AccountHasWorkspaces[];

  @OneToMany(
    () => CredentialGroups,
    (credentialGroups) => credentialGroups.workspace
  )
  credentialGroups: CredentialGroups[];
}
