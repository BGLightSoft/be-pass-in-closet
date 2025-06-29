import { MailAuthTransporterType } from './mail-auth-transporter.type';

export type MailTransporterType = {
  host: string | undefined;
  port: number | undefined;
  secure: boolean;
  auth: MailAuthTransporterType | undefined;
  tls: {
    rejectUnauthorized: boolean;
  };
};
