import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Accounts } from './Accounts';

@Index('pk_otp_codes', ['id'], { unique: true })
@Entity('otp_codes', { schema: 'public' })
export class OtpCodes {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column({ name: 'account_id' })
  accountId: string;

  @Column('character varying', { name: 'type', nullable: true, length: 255 })
  type: string | null;

  @Column('character varying', { name: 'code', nullable: true, length: 255 })
  code: string | null;

  @Column('timestamp without time zone', { name: 'used_at', nullable: true })
  usedAt: Date | null;

  @Column('timestamp without time zone', { name: 'expire_at', nullable: true })
  expireAt: Date | null;

  @Column('timestamp without time zone', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => Accounts, (accounts) => accounts.otpCodes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  accounts: Accounts;
}
