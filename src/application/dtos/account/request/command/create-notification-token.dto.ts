import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNotificationTokenDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty({ description: 'Platform: web | ios | android' })
  @IsString()
  tokenPlatform: string;
}
