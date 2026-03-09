import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SEND_PASSWORD_RESET } from 'src/common/constants';

@Controller()
export class MailConsumer {
  constructor(private readonly mailer: MailerService) {}

  @EventPattern(SEND_PASSWORD_RESET)
  async handlePasswordReset(@Payload() data: { email: string; url: string }) {
    await this.mailer.sendMail({
      to: data.email,
      subject: 'Redefinição da senha',
      template: 'forgot-password.hbs',
      context: { url: data.url },
    });
  }
}
