import { Module } from '@nestjs/common';
import { HashService } from './hash.service';

const services = [HashService];

@Module({
  providers: [...services],
  exports: [...services],
})
export class HashServiceModule {}
