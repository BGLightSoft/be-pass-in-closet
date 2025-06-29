import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Accounts } from './Accounts';

@Index('pk_account_tokens', ['id'], { unique: true })
@Entity('account_tokens', { schema: 'public' })
export class AccountTokens {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;
  @Column('uuid', {
    name: 'account_id',
  })
  accountId: string;
  @Column('character varying', { name: 'type', nullable: true, length: 255 })
  type: string | null;

  @Column('uuid', { name: 'tokenable_id', nullable: true })
  tokenableId: string | null;

  @Column('character varying', { name: 'token', nullable: true, length: 255 })
  token: string | null;

  @Column('timestamp without time zone', { name: 'expire_at', nullable: true })
  expireAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'last_used_at',
    nullable: true,
  })
  lastUsedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @ManyToOne(() => Accounts, (accounts) => accounts.accountTokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  accounts: Accounts;
}
