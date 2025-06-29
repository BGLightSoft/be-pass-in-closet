import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Accounts } from "./Accounts";

@Index("pk_application_errors", ["id"], { unique: true })
@Entity("application_errors", { schema: "public" })
export class ApplicationErrors {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "type", nullable: true, length: 255 })
  type: string | null;

  @Column("character varying", { name: "message", nullable: true, length: 255 })
  message: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @ManyToOne(() => Accounts, (accounts) => accounts.applicationErrors, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;
}
