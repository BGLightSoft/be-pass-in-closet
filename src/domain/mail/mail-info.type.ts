export type MailInfoType = {
  to: string;
  from?: string;
  template: string;
  context: {
    [key: string]: any;
    qrCode?: string;
  };
  language: string;
};
