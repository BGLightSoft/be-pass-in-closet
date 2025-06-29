import { Injectable } from '@nestjs/common';
import { AccountParameterListEnum } from 'src/domain/enums/account/account-parameter-list.enum';
import { AccountParameterModel } from 'src/domain/models/account/account-parameter.model';

@Injectable()
export class GetAccountNameQueryService {
  public async execute(
    accountParameters: AccountParameterModel[],
  ): Promise<{ firstName: string; lastName: string }> {
    const firstNameParam = accountParameters.find(
      (p) => p.name === AccountParameterListEnum.FIRST_NAME && p.isActive,
    );

    const lastNameParam = accountParameters.find(
      (p) => p.name === AccountParameterListEnum.LAST_NAME && p.isActive,
    );

    const firstName = firstNameParam?.data?.value ?? null;
    const lastName = lastNameParam?.data?.value ?? null;
    return { firstName, lastName };
  }
}
