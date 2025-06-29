import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtTokenService } from './jwt-token.service';
@Global()
@Module({
  imports: [ConfigModule, JwtModule.register({})],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenServiceModule {}
