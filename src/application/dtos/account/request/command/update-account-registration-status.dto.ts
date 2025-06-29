import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegistrationStatusEnum } from 'src/domain/enums/account/registration-status.enum';

export class UpdateAccountRegistrationStatusDto {
  @ApiProperty({
    example: RegistrationStatusEnum.ACCEPTED,
    description: 'Set Registration Status',
  })
  @IsNotEmpty()
  registrationStatus: RegistrationStatusEnum;
}
