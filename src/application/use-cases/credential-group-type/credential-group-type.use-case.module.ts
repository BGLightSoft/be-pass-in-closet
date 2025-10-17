import { Module } from '@nestjs/common';
import { CredentialGroupTypeServiceModule } from 'src/application/services/credential-group-type/credential-group-type.service.module';
import { GetAllCredentialGroupTypesQueryUseCase } from './query/get-all-credential-group-types.query.use-case';

@Module({
  imports: [CredentialGroupTypeServiceModule],
  providers: [GetAllCredentialGroupTypesQueryUseCase],
  exports: [GetAllCredentialGroupTypesQueryUseCase],
})
export class CredentialGroupTypeUseCaseModule {}
