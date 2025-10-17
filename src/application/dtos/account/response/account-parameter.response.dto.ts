import { ApiProperty } from '@nestjs/swagger';
import { AccountParameterModel } from 'src/domain/models/account/account-parameter.model';

export class AccountParameterResponseDto {
  [key: string]: any;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static fromModels(
    models: AccountParameterModel[] | any[],
  ): Record<string, any> {
    const result: Record<string, any> = {
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!models || models.length === 0) {
      return result;
    }

    models.forEach((model) => {
      const paramName = model.name;
      let paramValue = null;

      // Handle data field - could be object with value or direct value
      if (model.data) {
        if (typeof model.data === 'object' && 'value' in model.data) {
          paramValue = model.data.value;
        } else {
          paramValue = model.data;
        }
      }

      if (paramName) {
        result[paramName] = paramValue;
      }

      // Update metadata
      if (model.isActive !== undefined) {
        result.isActive = model.isActive;
      }
      if (model.createdAt) {
        result.createdAt = model.createdAt;
      }
      if (model.updatedAt) {
        result.updatedAt = model.updatedAt;
      }
    });

    return result;
  }
}
