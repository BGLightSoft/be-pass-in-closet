import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUpVerifiedCommandRequestDto {
  @ApiProperty({ default: 'STZWP6' })
  @IsString({ message: 'Code' })
  signUpVerifiedCode: string;
}
