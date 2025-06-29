import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { GetAccountByEmailQueryService } from 'src/application/services/account/query/get-account-by-email.query.service';

@Injectable()
export class AccountVerificationGuard implements CanActivate {
  constructor(
    private readonly getAccountByEmailQueryService: GetAccountByEmailQueryService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();

    const email = request.body?.email;

    if (!email) {
      throw new BadRequestException('Email is required in request body');
    }

    const account = await this.getAccountByEmailQueryService.execute(email);

    if (!account) {
      throw new UnauthorizedException('Account not found');
    }

    if (account.verifiedAt) {
      return true;
    }

    throw new UnauthorizedException('Account not Verified');
  }
}
