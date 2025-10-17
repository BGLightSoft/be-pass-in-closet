import { Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account/account.model';
import { GetAllAccountsQueryService } from 'src/application/services/account/query/get-all-accounts.query.service';
import { GetAllAccountsQueryResponseDto } from 'src/application/dtos/account/response/query/get-all-accounts.query.response.dto';

@Injectable()
export class GetAllAccountQueryUseCase {
  constructor(
    private readonly getAllAccountsQueryService: GetAllAccountsQueryService,
  ) {}
  public async execute(): Promise<GetAllAccountsQueryResponseDto[]> {
    try {
      const accounts: AccountModel[] =
        await this.getAllAccountsQueryService.execute();
      return accounts.map(
        (account) => new GetAllAccountsQueryResponseDto(account),
      );
    } catch (error) {
      throw error;
    }
  }
}
