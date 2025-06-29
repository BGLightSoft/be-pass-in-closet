import { Module } from '@nestjs/common';
import { MailSenderCommandService } from './command/mail-sender.command.service';

const command = [
  MailSenderCommandService,

];

const query = [
];

@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class NotificationServiceModule { }
