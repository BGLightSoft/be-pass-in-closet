import { CredentialModel } from 'src/domain/models/credential/credential.model';
import { IBaseRepository } from '../base.repository.interface';
import { Credentials } from 'src/infrastructure/database/postgres/entities/Credentials';

export interface ICredentialRepository
  extends IBaseRepository<Credentials, CredentialModel> {
  findByCredentialGroupId(
    credentialGroupId: string,
  ): Promise<CredentialModel[]>;
}

export const ICredentialRepository = Symbol('ICredentialRepository');
