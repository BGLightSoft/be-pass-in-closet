import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BusinessErrorException } from '../exceptions/business-error.exception';
import { IResponseBody } from 'src/domain/response/response-body.interface';

@Catch(HttpException)
export class BusinessErrorExceptionFilter implements ExceptionFilter {
  constructor() {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let httpStatusCode = 400;
    let customBodyStatusCode = 400;
    let message = exception.message;
    let accountId: string | undefined;
    let email: string | undefined;
    let data: string | undefined;
    let request: any | undefined;

    if (exception instanceof BusinessErrorException) {
      accountId = exception.accountId;
      email = exception.email;
      data = exception.data;
      request = exception.request;
    }

    if (message === 'Unauthorized') {
      httpStatusCode = 401;
      customBodyStatusCode = 401;
      message = 'Unauthorized';
    } else {
      const [statusCode, bodyStatusCode, bodyMsg] = message.split(',');

      httpStatusCode = Number(statusCode) || 400;
      customBodyStatusCode = Number(bodyStatusCode) || 400;
      message = bodyMsg || message;
    }

    httpStatusCode = httpStatusCode ?? 400;
    const errorResponse: IResponseBody = {
      statusCode: customBodyStatusCode,
      message,
      payload: [data],
    };

    response.status(httpStatusCode).json(errorResponse);
  }
}
