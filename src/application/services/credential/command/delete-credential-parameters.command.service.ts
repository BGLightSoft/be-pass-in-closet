import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ICredentialParameterRepository } from 'src/domain/repositories/credential/credential-parameter.repository.interface';

@Injectable()
export class DeleteCredentialParametersCommandService {
  constructor(
    @Inject(ICredentialParameterRepository)
    private readonly credentialParameterRepository: ICredentialParameterRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    credentialId: string,
  ): Promise<any> {
    return await this.credentialParameterRepository.softDelete(
      { credentialId },
      queryRunner,
    );
  }
}
