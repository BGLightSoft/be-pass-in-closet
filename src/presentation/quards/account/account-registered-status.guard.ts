import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { GetAccountTokenQueryService } from 'src/application/services/account-tokens/query/get-account-token.query.service';
import { GetAccountByEmailQueryService } from 'src/application/services/account/query/get-account-by-email.query.service';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { RegistrationStatusEnum } from 'src/domain/enums/account/registration-status.enum';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';

@Injectable()
export class AccountRegisteredStatusGuard implements CanActivate {
  constructor(
    private readonly getAccountByEmailQueryService: GetAccountByEmailQueryService,
    private readonly getAccountTokenQueryService: GetAccountTokenQueryService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();

    const email = request.body?.email;

    if (!email) {
      throw new BadRequestException('Email is required in request body');
    }

    const account = await this.getAccountByEmailQueryService.execute(email);

    if (!account) {
      throw new BusinessErrorException(
        AccountErrorMessagesEnum.ACCOUNT_NOT_FOUND,
      );
    }

    if (account.registrationStatus == RegistrationStatusEnum.ACCEPTED) {
      return true;
    }

    const accountToken = await this.getAccountTokenQueryService.byAccountId(
      account.id!,
      AccountTokenTypeEnum.SIGN_UP_VERFIED_TOKEN,
    );

    throw new BusinessErrorException(
      AccountErrorMessagesEnum.REGISTERED_STATUS,
      { data: accountToken?.token },
    );
  }
}
