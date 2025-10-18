import { CredentialParameterModel } from 'src/domain/models/credential/credential-parameter.model';
import { IBaseRepository } from '../base.repository.interface';
import { CredentialParameters } from 'src/infrastructure/database/postgres/entities/CredentialParameters';

export interface ICredentialParameterRepository
  extends IBaseRepository<CredentialParameters, CredentialParameterModel> {
  findByCredentialId(credentialId: string): Promise<CredentialParameterModel[]>;
  updateCredentialIndexes(
    credentialGroupId: string,
    credentialIndexes: Array<{ credentialId: string; index: number }>,
  ): Promise<void>;
}

export const ICredentialParameterRepository = Symbol(
  'ICredentialParameterRepository',
);
