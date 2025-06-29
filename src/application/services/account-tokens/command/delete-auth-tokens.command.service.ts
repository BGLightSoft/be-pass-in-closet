import { Injectable } from '@nestjs/common';
import { DeleteTokenCommandService } from './delete-token.command.service';

@Injectable()
export class DeleteAuthtokensCommandService {
  constructor(
    private readonly deleteTokenCommandService: DeleteTokenCommandService,
  ) {}

  public async execute(
    accountId: string,
    acessToken: string,
    refreshToken: string,
  ): Promise<boolean> {
    await this.deleteTokenCommandService.execute(accountId, acessToken);
    await this.deleteTokenCommandService.execute(accountId, refreshToken);
    return true;
  }
}
