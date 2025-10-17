import { ApiProperty } from '@nestjs/swagger';
import { AccountModel } from 'src/domain/models/account/account.model';

export class UpdateAccountRegistrationStatusCommandResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  registrationStatus: string | null;

  @ApiProperty()
  updatedAt: Date;

  constructor(model: AccountModel) {
    this.id = model.id!;
    this.email = model.email;
    this.registrationStatus = model.registrationStatus;
    this.updatedAt = model.updatedAt;
  }
}
