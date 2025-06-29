import { Inject, Injectable } from '@nestjs/common';
import { AccountParameterModel } from 'src/domain/models/account/account-parameter.model';
import { IAccountParameterRepository } from 'src/domain/repositories/account/account-parameter.repository.interface';

@Injectable()
export class GetAcountParameterByNameQueryService {
  constructor(
    @Inject(IAccountParameterRepository)
    private readonly accountParameterRepository: IAccountParameterRepository,
  ) {}

  public async execute(
    accountId: string,
    name: string,
  ): Promise<AccountParameterModel | null> {
    return this.accountParameterRepository.findOne({
      where: { accountId, name },
    });
  }
}
