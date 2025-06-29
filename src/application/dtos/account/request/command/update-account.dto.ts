import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from '../base/account.dto';

export class UpdateAccountDto {
  @ApiProperty({
    default: {
      firstName: { value: 'Ali' },
      lastName: { value: 'Veli' },
    },
  })
  accountParameters?: any;

  @ApiProperty()
  account?: AccountDto;
}
