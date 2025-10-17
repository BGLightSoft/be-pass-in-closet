import { ApiProperty } from '@nestjs/swagger';
import { CredentialParameterModel } from 'src/domain/models/credential/credential-parameter.model';

export class CredentialParameterResponseDto {
  [key: string]: any;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static fromModels(
    models: CredentialParameterModel[],
  ): CredentialParameterResponseDto {
    const dto = new CredentialParameterResponseDto();

    models.forEach((model) => {
      const paramName = model.name;
      const paramValue =
        model.data && typeof model.data === 'object' && 'value' in model.data
          ? (model.data as any).value
          : null;

      if (paramName) {
        dto[paramName] = paramValue;
      }

      // Set metadata from first parameter (they should all be same for a credential)
      if (!dto.isActive && model.isActive !== undefined) {
        dto.isActive = model.isActive;
      }
      if (!dto.createdAt && model.createdAt) {
        dto.createdAt = model.createdAt;
      }
      if (!dto.updatedAt && model.updatedAt) {
        dto.updatedAt = model.updatedAt;
      }
    });

    return dto;
  }

  static fromModelsArray(
    models: CredentialParameterModel[],
  ): Record<string, any> {
    const result: Record<string, any> = {
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    models.forEach((model) => {
      const paramName = model.name;
      const paramValue =
        model.data && typeof model.data === 'object' && 'value' in model.data
          ? (model.data as any).value
          : null;

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
