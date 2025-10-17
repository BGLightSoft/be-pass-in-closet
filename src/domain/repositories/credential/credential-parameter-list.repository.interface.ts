import { CredentialParameterListModel } from 'src/domain/models/credential/credential-parameter-list.model';
import { IBaseRepository } from '../base.repository.interface';
import { CredentialParameterList } from 'src/infrastructure/database/postgres/entities/CredentialParameterList';

export interface ICredentialParameterListRepository
  extends IBaseRepository<
    CredentialParameterList,
    CredentialParameterListModel
  > {
  findByCredentialGroupTypeId(
    credentialGroupTypeId: string,
  ): Promise<CredentialParameterListModel[]>;
}

export const ICredentialParameterListRepository = Symbol(
  'ICredentialParameterListRepository',
);
