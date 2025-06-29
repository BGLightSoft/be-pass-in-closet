import { Module } from '@nestjs/common';
import { IOtpCodeRepository } from 'src/domain/repositories/otp/otp-code.repository.interface';
import { OtpCodeRepository } from './otp-code.repository';

const providers = [
  {
    provide: IOtpCodeRepository,
    useClass: OtpCodeRepository,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class OtpInfrastructureRepositoriesModule {}
