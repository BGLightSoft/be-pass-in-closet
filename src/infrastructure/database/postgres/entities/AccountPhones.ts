import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Accounts } from "./Accounts";

@Index("UQ_33409f44928f39805eb64d6497a", ["accountId"], { unique: true })
@Index("index_account_id", ["accountId"], {})
@Index(
  "unique_account_id,phone_number,deleted_at",
  ["accountId", "deletedAt", "phoneNumber"],
  { unique: true }
)
@Index("pk_account_phones", ["id"], { unique: true })
@Index("UQ_7ef683856b1fb861ae27ce9b969", ["phoneNumber"], { unique: true })
@Entity("account_phones", { schema: "public" })
export class AccountPhones {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "account_id", nullable: true, unique: true })
  accountId: string | null;

  @Column("character varying", {
    name: "country_code",
    nullable: true,
    length: 5,
  })
  countryCode: string | null;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    unique: true,
    length: 20,
  })
  phoneNumber: string | null;

  @Column("date", { name: "verified_at", nullable: true })
  verifiedAt: string | null;

  @Column("boolean", { name: "is_primary", nullable: true })
  isPrimary: boolean | null;

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

  @OneToOne(() => Accounts, (accounts) => accounts.accountPhones, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;
}
