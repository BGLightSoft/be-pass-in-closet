import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IAccountParameterRepository } from 'src/domain/repositories/account/account-parameter.repository.interface';
import { AccountParameterListEnum } from 'src/domain/enums/account/account-parameter-list.enum';
import { AccountParameterModel } from 'src/domain/models/account/account-parameter.model';
import { GetAcountParameterByNameQueryService } from '../query/get-account-parameter-by-name.query.service';

@Injectable()
export class UpdateAccountParameterCommandService {
  constructor(
    @Inject(IAccountParameterRepository)
    private readonly accountParameterRepository: IAccountParameterRepository,
    private readonly getAcountParameterByNameQueryService: GetAcountParameterByNameQueryService,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    accountId: string,
    rawParams: Record<string, any>,
  ): Promise<void> {
    for (const [key, value] of Object.entries(rawParams)) {
      if (
        Object.values(AccountParameterListEnum).includes(
          key as AccountParameterListEnum,
        )
      ) {
        const existing =
          await this.getAcountParameterByNameQueryService.execute(
            accountId,
            key,
          );

        const model = new AccountParameterModel({
          id: existing?.id,
          accountId,
          name: key,
          data: value,
        });

        if (existing) {
          await this.accountParameterRepository.update(
            { id: existing?.id },
            model,
            queryRunner,
          );
        } else {
          await this.accountParameterRepository.save(model, {}, queryRunner);
        }
      }
    }
  }
}
