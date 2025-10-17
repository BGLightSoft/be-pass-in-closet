import { ApiProperty } from '@nestjs/swagger';
import { AccountModel } from 'src/domain/models/account/account.model';
import { AccountParameterResponseDto } from '../account-parameter.response.dto';

export class GetAllAccountsQueryResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isFrozen: boolean;

  @ApiProperty()
  registrationStatus: string | null;

  @ApiProperty()
  verifiedAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: Object, nullable: true })
  accountParameters?: Record<string, any>;

  constructor(model: AccountModel) {
    this.id = model.id!;
    this.email = model.email;
    this.isActive = model.isActive;
    this.isFrozen = model.isFrozen;
    this.registrationStatus = model.registrationStatus;
    this.verifiedAt = model.verifiedAt;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.accountParameters = model.accountParameters
      ? AccountParameterResponseDto.fromModels(model.accountParameters)
      : undefined;
  }
}
