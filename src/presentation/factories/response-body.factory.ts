import { IBusinessErrorResponseBody } from 'src/domain/response/business-error-response-body.interface';
import { IGlobalErrorResponseBody } from 'src/domain/response/global-error-response-body.interface';
import { ResponseTypeEnum } from 'src/domain/response/response-type.enum';
import { ISuccessfulResponseBody } from 'src/domain/response/successful-response-body.interface';
import { TypesEnum } from 'src/domain/response/types.enum';
import { IValidationErrorResponseBody } from 'src/domain/response/validation-error-response-body.interface';

export class ResponseBodyFactory {
  public static createBusinessErrorResponseBody(
    customCode: number,
    message: string,
    path: string,
  ): IBusinessErrorResponseBody {
    return {
      responseType: ResponseTypeEnum.BUSINESS_ERROR,
      customCode,
      path,
      timestamp: new Date().toISOString(),
      message,
    };
  }

  public static createValidationErrorResponseBody(
    message: string[],
    path: string,
  ): IValidationErrorResponseBody {
    return {
      responseType: ResponseTypeEnum.VALIDATION_ERROR,
      path,
      timestamp: new Date().toISOString(),
      message,
    };
  }

  public static createSuccessfulResponseBody(
    path: string,
    payload: any,
  ): ISuccessfulResponseBody {
    const normalizedPayload = this.normalizePayload(payload);

    return {
      responseType: ResponseTypeEnum.SUCCESS,
      path,
      timestamp: new Date().toISOString(),
      payload: normalizedPayload,
    };
  }

  public static normalizePayload(payload: any): any {
    if (payload === null || payload === undefined) return null;

    if (Array.isArray(payload)) {
      return { items: payload };
    }

    if (typeof payload === TypesEnum.OBJECT) {
      return payload;
    }

    return { value: payload };
  }

  public static createGlobalErrorResponseBody(
    path: string,
    message: string,
  ): IGlobalErrorResponseBody {
    return {
      responseType: ResponseTypeEnum.GLOBAL_ERROR,
      path,
      timestamp: new Date().toISOString(),
      message,
    };
  }
}
