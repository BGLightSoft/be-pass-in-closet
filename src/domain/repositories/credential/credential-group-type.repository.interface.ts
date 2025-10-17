import { CredentialGroupTypeModel } from 'src/domain/models/credential/credential-group-type.model';
import { IBaseRepository } from '../base.repository.interface';
import { CredentialGroupTypes } from 'src/infrastructure/database/postgres/entities/CredentialGroupTypes';

export interface ICredentialGroupTypeRepository
  extends IBaseRepository<CredentialGroupTypes, CredentialGroupTypeModel> {
  findByName(name: string): Promise<CredentialGroupTypeModel | null>;
}

export const ICredentialGroupTypeRepository = Symbol(
  'ICredentialGroupTypeRepository',
);
