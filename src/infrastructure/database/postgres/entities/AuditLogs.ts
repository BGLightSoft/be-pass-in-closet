import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Accounts } from './Accounts';

@Index('pk_audit_logs', ['id'], { unique: true })
@Entity('audit_logs', { schema: 'public' })
export class AuditLogs {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('character varying', {
    name: 'interaction_types',
    nullable: true,
    length: 255,
  })
  interactionTypes: string | null;

  @Column('jsonb', { name: 'data', nullable: true })
  data: object | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @ManyToOne(() => Accounts, (accounts) => accounts.auditLogs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  accounts: Accounts;
}
