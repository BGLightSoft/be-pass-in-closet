import { Module } from '@nestjs/common';
import { ICredentialGroupTypeRepository } from 'src/domain/repositories/credential/credential-group-type.repository.interface';
import { CredentialGroupTypeRepository } from './credential-group-type.repository';
import { ICredentialGroupRepository } from 'src/domain/repositories/credential/credential-group.repository.interface';
import { CredentialGroupRepository } from './credential-group.repository';
import { ICredentialRepository } from 'src/domain/repositories/credential/credential.repository.interface';
import { CredentialRepository } from './credential.repository';
import { ICredentialParameterRepository } from 'src/domain/repositories/credential/credential-parameter.repository.interface';
import { CredentialParameterRepository } from './credential-parameter.repository';
import { ICredentialParameterListRepository } from 'src/domain/repositories/credential/credential-parameter-list.repository.interface';
import { CredentialParameterListRepository } from './credential-parameter-list.repository';

const providers = [
  {
    provide: ICredentialGroupTypeRepository,
    useClass: CredentialGroupTypeRepository,
  },
  {
    provide: ICredentialGroupRepository,
    useClass: CredentialGroupRepository,
  },
  {
    provide: ICredentialRepository,
    useClass: CredentialRepository,
  },
  {
    provide: ICredentialParameterRepository,
    useClass: CredentialParameterRepository,
  },
  {
    provide: ICredentialParameterListRepository,
    useClass: CredentialParameterListRepository,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class CredentialInfrastructureRepositoriesModule {}
