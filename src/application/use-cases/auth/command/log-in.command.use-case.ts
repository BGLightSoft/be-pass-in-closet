import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LogInCommandRequestDto } from 'src/application/dtos/auth/request/command/log-in.command.request.dto';
import { LogInCommandResponseDto } from 'src/application/dtos/auth/response/command/log-in.command.response.dto';
import { GetAccountByEmailQueryService } from 'src/application/services/account/query/get-account-by-email.query.service';
import { AccountModel } from 'src/domain/models/account/account.model';
import { HashService } from 'src/application/services/hash/hash.service';
import { CreateAuthtokensCommandService } from 'src/application/services/account-tokens/command/create-auth-tokens.command.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';

@Injectable()
export class LogInCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly getAccountByEmailQueryService: GetAccountByEmailQueryService,
    private readonly hashService: HashService,
    private readonly createAuthtokensCommandService: CreateAuthtokensCommandService,
  ) {}
  public async execute(
    body: LogInCommandRequestDto,
  ): Promise<LogInCommandResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email, password } = body;

      const accountModel: AccountModel | any =
        await this.getAccountByEmailQueryService.execute(email);

      if (!accountModel)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.EMAIL_PASS_WRONG,
        );

      const isMatch: boolean = await this.hashService.comparePassword(
        password,
        accountModel.password,
      );

      if (!isMatch)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.EMAIL_PASS_WRONG,
        );

      const authTokens = await this.createAuthtokensCommandService.execute(
        queryRunner,
        accountModel.id,
        email,
      );

      await queryRunner.commitTransaction();

      return new LogInCommandResponseDto(accountModel, authTokens);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
