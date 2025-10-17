import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountCommandRequestDto {
  @ApiProperty({
    default: {
      firstName: { value: 'Ali' },
      lastName: { value: 'Veli' },
    },
    required: false,
  })
  accountParameters?: any;
}
