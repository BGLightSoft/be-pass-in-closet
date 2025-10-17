import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Accounts } from './Accounts';
import { Workspaces } from './Workspaces';

@Index(
  'INDEX_account_has_workspace_account_id_workspace_id',
  ['accountId', 'workspaceId'],
  { unique: true },
)
@Index('PK_account_has_workspaces_id', ['id'], { unique: true })
@Entity('account_has_workspaces', { schema: 'public' })
export class AccountHasWorkspaces {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('uuid', { name: 'account_id', nullable: true })
  accountId: string | null;

  @Column('uuid', { name: 'workspace_id', nullable: true })
  workspaceId: string | null;

  @Column('boolean', {
    name: 'is_default',
    nullable: true,
    default: () => 'false',
  })
  isDefault: boolean | null;

  @Column('boolean', {
    name: 'is_active',
    nullable: true,
    default: () => 'true',
  })
  isActive: boolean | null;

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

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Accounts, (accounts) => accounts.accountHasWorkspaces, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Accounts;

  @ManyToOne(
    () => Workspaces,
    (workspaces) => workspaces.accountHasWorkspaces,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'workspace_id', referencedColumnName: 'id' }])
  workspace: Workspaces;
}
