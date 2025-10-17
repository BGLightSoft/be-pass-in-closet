import { ApiProperty } from '@nestjs/swagger';
import { AccountModel } from 'src/domain/models/account/account.model';

export class UpdateAccountCommandResponseDto {
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

  @ApiProperty()
  accountParameters?: any[];

  constructor(model: AccountModel) {
    this.id = model.id!;
    this.email = model.email;
    this.isActive = model.isActive;
    this.isFrozen = model.isFrozen;
    this.registrationStatus = model.registrationStatus;
    this.verifiedAt = model.verifiedAt;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.accountParameters = model.accountParameters;
  }
}
