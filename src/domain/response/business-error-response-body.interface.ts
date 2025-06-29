import { IErrorResponseBody } from './error-response-body.interface';

export interface IBusinessErrorResponseBody extends IErrorResponseBody {
  customCode: number;
}
