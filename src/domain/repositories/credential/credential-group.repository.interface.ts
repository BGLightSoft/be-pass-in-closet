import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';
import { IBaseRepository } from '../base.repository.interface';
import { CredentialGroups } from 'src/infrastructure/database/postgres/entities/CredentialGroups';

export interface ICredentialGroupRepository
  extends IBaseRepository<CredentialGroups, CredentialGroupModel> {
  findByWorkspaceId(workspaceId: string): Promise<CredentialGroupModel[]>;
  findByCredentialGroupTypeId(
    credentialGroupTypeId: string,
  ): Promise<CredentialGroupModel[]>;
  findByCredentialGroupId(
    credentialGroupId: string,
  ): Promise<CredentialGroupModel[]>;
}

export const ICredentialGroupRepository = Symbol('ICredentialGroupRepository');
