import { Module } from '@nestjs/common';
import { CredentialInfrastructureRepositoriesModule } from 'src/infrastructure/repositories/credential/credential.infrastructure.repositories.module';
import { GetAllCredentialGroupTypesQueryService } from './query/get-all-credential-group-types.query.service';
import { GetCredentialGroupTypeByIdQueryService } from './query/get-credential-group-type-by-id.query.service';

@Module({
  imports: [CredentialInfrastructureRepositoriesModule],
  providers: [
    GetAllCredentialGroupTypesQueryService,
    GetCredentialGroupTypeByIdQueryService,
  ],
  exports: [
    GetAllCredentialGroupTypesQueryService,
    GetCredentialGroupTypeByIdQueryService,
  ],
})
export class CredentialGroupTypeServiceModule {}
