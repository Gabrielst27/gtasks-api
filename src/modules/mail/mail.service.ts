import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailService } from 'src/modules/mail/mail.service.interface';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordRequest(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Redefinição de senha',
      template: 'forgot-password.hbs',
      context: {
        url: `${process.env.API_PATH}/auth/reset-password?token=${token}`,
      },
    });
  }
}
