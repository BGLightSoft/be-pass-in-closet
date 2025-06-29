import { IBusinessErrorMessage } from 'src/domain/message/business-error-message.interface';

export class ErrorMessageFactory {
  public static createBusinessErrorMessage(
    statusCode: number,
    customCode: number,
    message: string,
  ): IBusinessErrorMessage {
    return {
      statusCode,
      customCode,
      message,
    };
  }
}
