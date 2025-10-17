import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ICredentialParameterRepository } from 'src/domain/repositories/credential/credential-parameter.repository.interface';
import { CredentialParameterModel } from 'src/domain/models/credential/credential-parameter.model';

@Injectable()
export class CreateCredentialParameterCommandService {
  constructor(
    @Inject(ICredentialParameterRepository)
    private readonly credentialParameterRepository: ICredentialParameterRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    parameterData: Partial<CredentialParameterModel>,
  ): Promise<CredentialParameterModel> {
    return await this.credentialParameterRepository.save(
      parameterData,
      undefined,
      queryRunner,
    );
  }
}
