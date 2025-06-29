import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Accounts } from './Accounts';

@Index('index_account_id', ['accountId'], {})
@Index(
  'unique_account_id,phone_number,deleted_at',
  ['accountId', 'deletedAt', 'phoneNumber'],
  { unique: true },
)
@Index('pk_account_phones', ['id'], { unique: true })
@Entity('account_phones', { schema: 'public' })
export class AccountPhones {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('uuid', { name: 'account_id', nullable: true, unique: true })
  accountId: string | null;

  @Column('character varying', {
    name: 'country_code',
    nullable: true,
    length: 5,
  })
  countryCode: string | null;

  @Column('character varying', {
    name: 'phone_number',
    nullable: true,
    unique: true,
    length: 20,
  })
  phoneNumber: string | null;

  @Column('date', { name: 'verified_at', nullable: true })
  verifiedAt: Date | null;

  @Column('boolean', { name: 'is_primary', nullable: true })
  isPrimary: boolean | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    nullable: true,
    default: () => 'now()',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp without time zone',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(() => Accounts, (accounts) => accounts.accountPhones, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  accounts: Accounts;

}
