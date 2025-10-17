import { Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account/account.model';
import { UpdateAccountCommandService } from 'src/application/services/account/command/update-account.command.service';
import { GetOneAccountByIdQueryService } from 'src/application/services/account/query/get-one-account-by-id.query.service';
import { DataSource } from 'typeorm';
import { UpdateAccountCommandRequestDto } from 'src/application/dtos/account/request/command/update-account.command.request.dto';
import { UpdateAccountCommandResponseDto } from 'src/application/dtos/account/response/command/update-account.command.response.dto';
import { UpdateAccountParameterCommandService } from 'src/application/services/account/command/update-account-parameter.command.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';

@Injectable()
export class UpdateAccountCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly updateAccountCommandService: UpdateAccountCommandService,
    private readonly updateAccountParameterCommandService: UpdateAccountParameterCommandService,
    private readonly getOneAccountByIdQueryService: GetOneAccountByIdQueryService,
  ) {}
  public async execute(
    accountId: string,
    body: UpdateAccountCommandRequestDto,
  ): Promise<UpdateAccountCommandResponseDto | null> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const accountModel: AccountModel | null =
        await this.getOneAccountByIdQueryService.execute(accountId);

      if (!accountModel) {
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.ACCOUNT_NOT_FOUND,
        );
      }

      const { accountParameters } = body;

      if (accountParameters) {
        await this.updateAccountParameterCommandService.execute(
          queryRunner,
          accountId,
          accountParameters,
        );
      }

      await queryRunner.commitTransaction();

      const updatedAccountModel: AccountModel | null =
        await this.getOneAccountByIdQueryService.execute(accountId);

      if (!updatedAccountModel) return null;

      return new UpdateAccountCommandResponseDto(updatedAccountModel);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
