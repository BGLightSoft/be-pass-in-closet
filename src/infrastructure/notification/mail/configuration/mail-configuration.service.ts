import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { SentMessageInfo } from 'nodemailer';
import { MailAuthTransporterType } from 'src/domain/mail/mail-auth-transporter.type';
import { MailInfoType } from 'src/domain/mail/mail-info.type';
import { MailOptionsType } from 'src/domain/mail/mail-options.type';
import { MailTransporterType } from 'src/domain/mail/mail-transporter.type';
import handlebarsHelpers = require('handlebars-helpers');
import { TemplateErrorMessagesEnum } from 'src/domain/enums/error-messages/template-error-messages.enum';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';

const allHelpers = handlebarsHelpers();

Object.entries(allHelpers).forEach(([name, fn]) => {
  handlebars.registerHelper(name, fn as handlebars.HelperDelegate);
});

function transporterAuthGenerator(): MailAuthTransporterType {
  return {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  };
}

function transporterGenerator(): MailTransporterType {
  return {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT
      ? parseInt(process.env.MAIL_PORT, 10)
      : undefined,
    secure: process.env.MAIL_SECURE === 'true',
    auth: transporterAuthGenerator(),
    tls: {
      rejectUnauthorized: process.env.MAIL_REJECTUNAUTHORIZED !== 'false',
    },
  };
}

function mailOptionsGenerator(
  from: string,
  to: string,
  subject: string,
  html: string,
  attachDataUrls: boolean,
): MailOptionsType {
  return {
    from,
    to,
    subject,
    html,
    attachDataUrls,
  };
}

@Injectable()
export class MailConfigurationService {
  private readonly _transporter: nodemailer.Transporter;

  public constructor() {
    this._transporter = nodemailer.createTransport(transporterGenerator());
  }

  public async execute(emailInfo: MailInfoType): Promise<MailOptionsType> {
    try {
      const subject = this._loadSubject(emailInfo.template, emailInfo.language);
      const domain = process.env.MAIL_HOST;
      const mailOptions = mailOptionsGenerator(
        emailInfo.from || `<noreply@${domain}>`,
        emailInfo.to,
        subject,
        this._renderTemplate(
          emailInfo.template,
          emailInfo.context,
          emailInfo.language,
        ),
        true,
      );

      return mailOptions;
    } catch (error) {
      throw error;
    }
  }

  private _renderTemplate(
    templateName: string,
    context: any,
    lang: string,
  ): string {
    const rootDir = process.cwd();

    const templatePath = path.join(
      rootDir,
      process.env.TEMPLATE_PATH!,
      `${lang}`,
      `${templateName}.hbs`,
    );

    if (!fs.existsSync(templatePath)) {
      throw new BusinessErrorException(
        TemplateErrorMessagesEnum.TEMPLATE_NOT_FOUND,
      );
    }

    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(context);
  }

  private _loadSubject(templateName: string, language: string): string {
    const rootDir = process.cwd();

    const subjectFilePath = path.join(
      rootDir,
      process.env.SUBJECT_PATH!,
      `subject.${language}.json`,
    );

    if (!fs.existsSync(subjectFilePath)) {
      throw new BusinessErrorException(
        TemplateErrorMessagesEnum.SUBJECT_NOT_FOUND,
      );
    }

    const subjects = JSON.parse(fs.readFileSync(subjectFilePath, 'utf8'));
    if (!subjects[templateName]) {
      throw new BusinessErrorException(
        TemplateErrorMessagesEnum.SUBJECT_NOT_FOUND,
      );
    }

    return subjects[templateName];
  }

  public get transporter(): nodemailer.Transporter {
    return this._transporter;
  }
}
