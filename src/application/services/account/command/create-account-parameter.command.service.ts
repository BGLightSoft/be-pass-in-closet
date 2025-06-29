import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { AccountParameterListEnum } from 'src/domain/enums/account/account-parameter-list.enum';
import { AccountParameterModel } from 'src/domain/models/account/account-parameter.model';
import { IAccountParameterRepository } from 'src/domain/repositories/account/account-parameter.repository.interface';

@Injectable()
export class CreateAccountParameterCommandService {
  constructor(
    @Inject(IAccountParameterRepository)
    private readonly accountParameterRepository: IAccountParameterRepository,
  ) {}
  public async execute(
    queryRunner: QueryRunner,
    accountId: string,
    parameters: any[],
  ) {
    for (const parameter of parameters) {
      for (const [key, value] of Object.entries(parameter)) {
        if (
          Object.values(AccountParameterListEnum).includes(
            key as AccountParameterListEnum,
          )
        ) {
          const accountParameterModel: AccountParameterModel =
            new AccountParameterModel({
              accountId,
              name: key,
              data: { value },
            });

          await this.accountParameterRepository.save(
            accountParameterModel,
            {},
            queryRunner,
          );
        }
      }
    }
  }
}
