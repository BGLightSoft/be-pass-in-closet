import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ICredentialParameterRepository } from 'src/domain/repositories/credential/credential-parameter.repository.interface';
import { CredentialParameterModel } from 'src/domain/models/credential/credential-parameter.model';

@Injectable()
export class UpdateCredentialParameterCommandService {
  constructor(
    @Inject(ICredentialParameterRepository)
    private readonly credentialParameterRepository: ICredentialParameterRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    credentialId: string,
    parameterName: string,
    newData: object,
  ): Promise<any> {
    return await this.credentialParameterRepository.update(
      { credentialId, name: parameterName },
      { data: newData } as any,
      queryRunner,
    );
  }
}
