import { Module } from '@nestjs/common';

const command = [];

@Module({
  providers: [...command],
  exports: [...command],
})
export class AuthServiceModule {}
