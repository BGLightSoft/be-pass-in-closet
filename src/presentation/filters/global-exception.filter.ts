import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import { HttpException } from '@nestjs/common';
import { ResponseBodyFactory } from '../factories/response-body.factory';
import { TypesEnum } from 'src/domain/response/types.enum';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const path = request?.route?.path || 'unknown';
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message || 'Internal server error';

    response
      .status(status)
      .json(
        ResponseBodyFactory.createGlobalErrorResponseBody(
          path,
          typeof message === TypesEnum.STRING
            ? message
            : JSON.stringify(message),
        ),
      );
  }
}
