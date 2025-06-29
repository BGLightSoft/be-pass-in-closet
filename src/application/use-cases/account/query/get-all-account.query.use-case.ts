import { Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account/account.model';
import { GetAllAccountsQueryService } from 'src/application/services/account/query/get-all-accounts.query.service';

@Injectable()
export class GetAllAccountQueryUseCase {
  constructor(
    private readonly getAllAccountsQueryService: GetAllAccountsQueryService,
  ) {}
  public async execute(): Promise<AccountModel[]> {
    try {
      return this.getAllAccountsQueryService.execute();
    } catch (error) {
      throw error;
    }
  }
}
