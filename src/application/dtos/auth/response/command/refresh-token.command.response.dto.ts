import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenCommandResponseDto {
  @ApiProperty({ description: 'New access token' })
  accessToken: string;

  @ApiProperty({ description: 'New refresh token' })
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
