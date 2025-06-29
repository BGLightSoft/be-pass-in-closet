import { Module } from '@nestjs/common';
import { CreateOtpCodeCommandService } from './command/create-otp-code.command.service';
import { GetOtpCodeQueryService } from './query/get-otp-code.query.service';
import { DeleteOtpCodeCommandService } from './command/delete-otp-code.command.service';

const command = [CreateOtpCodeCommandService, DeleteOtpCodeCommandService];

const query = [GetOtpCodeQueryService];
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class OtpServiceModule {}
