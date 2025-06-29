import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import { MailInfoType } from 'src/domain/mail/mail-info.type';
import { MailConfigurationService } from 'src/infrastructure/notification/mail/configuration/mail-configuration.service';

@Injectable()
export class MailSenderCommandService {
  private readonly _transporter: nodemailer.Transporter;

  public constructor(public readonly conf: MailConfigurationService) {
    this._transporter = conf.transporter;
  }

  public async mailSender(emailInfo: MailInfoType): Promise<SentMessageInfo> {
    try {
      const mailOptions = await this.conf.execute(emailInfo);

      const success: SentMessageInfo = await new Promise((resolve, reject) => {
        this._transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(info);
        });
      });
      return success.accepted;
    } catch (error) {
      throw error;
    }
  }
}
