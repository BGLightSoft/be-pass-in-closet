import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegistrationStatusEnum } from 'src/domain/enums/account/registration-status.enum';

export class UpdateAccountRegistrationStatusCommandRequestDto {
  @ApiProperty({
    example: RegistrationStatusEnum.ACCEPTED,
    description: 'Set Registration Status',
    enum: RegistrationStatusEnum,
  })
  @IsNotEmpty()
  registrationStatus: RegistrationStatusEnum;
}
