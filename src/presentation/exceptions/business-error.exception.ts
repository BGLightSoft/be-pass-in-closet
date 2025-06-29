import { HttpException, HttpStatus } from '@nestjs/common';

interface BusinessErrorExceptionOptions {
  accountId?: string;
  email?: string;
  request?: any;
  data?: any;
}

export class BusinessErrorException extends HttpException {
  public readonly accountId?: string;
  public readonly email?: string;
  public readonly request?: any;
  public readonly data?: any;

  constructor(
    message: string = '',
    options: BusinessErrorExceptionOptions = {},
  ) {
    super(message, HttpStatus.FORBIDDEN);

    const { accountId, email, request, data } = options;
    this.accountId = accountId;
    this.email = email;
    this.request = request;
    this.data = data;
  }
}
