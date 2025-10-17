import { Module } from '@nestjs/common';
import { CredentialInfrastructureRepositoriesModule } from 'src/infrastructure/repositories/credential/credential.infrastructure.repositories.module';
import { GetAllCredentialGroupTypesQueryService } from './query/get-all-credential-group-types.query.service';

@Module({
  imports: [CredentialInfrastructureRepositoriesModule],
  providers: [GetAllCredentialGroupTypesQueryService],
  exports: [GetAllCredentialGroupTypesQueryService],
})
export class CredentialGroupTypeServiceModule {}
