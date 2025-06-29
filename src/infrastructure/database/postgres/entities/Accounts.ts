import { Column, DeleteDateColumn, Entity, Index, OneToMany } from 'typeorm';
import { AccountParameters } from './AccountParameters';
import { AccountPhones } from './AccountPhones';
import { AccountTokens } from './AccountTokens';
import { ApplicationErrors } from './ApplicationErrors';
import { AuditLogs } from './AuditLogs';
import { OtpCodes } from './OtpCodes';

@Index('uniques_email_deleted_at', ['deletedAt', 'email'], { unique: true })
@Index('index_email', ['email'], {})
@Index('account_id', ['id'], { unique: true })
@Entity('accounts', { schema: 'public' })
export class Accounts {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('character varying', { name: 'email', length: 255 })
  email: string;

  @Column('character varying', {
    name: 'password',
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column('boolean', { name: 'is_active', nullable: true })
  isActive: boolean | null;

  @Column('boolean', { name: 'is_frozen', nullable: true })
  isFrozen: boolean | null;

  @Column('character varying', {
    name: 'registration_status',
    nullable: true,
    length: 255,
  })
  registrationStatus: string | null;

  @Column('timestamp without time zone', {
    name: 'verified_at',
    nullable: true,
  })
  verifiedAt: Date | null;

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

  @OneToMany(
    () => AccountParameters,
    (accountParameters) => accountParameters.accounts,
  )
  accountParameters: AccountParameters[];

  @OneToMany(() => AccountPhones, (accountPhones) => accountPhones.accounts)
  accountPhones: AccountPhones[];

  @OneToMany(() => AccountTokens, (accountTokens) => accountTokens.accounts)
  accountTokens: AccountTokens[];

  @OneToMany(
    () => ApplicationErrors,
    (applicationErrors) => applicationErrors.account,
  )
  applicationErrors: ApplicationErrors[];

  @OneToMany(() => AuditLogs, (auditLogs) => auditLogs.accounts)
  auditLogs: AuditLogs[];

  @OneToMany(() => OtpCodes, (otpCodes) => otpCodes.accounts)
  otpCodes: OtpCodes[];
}
