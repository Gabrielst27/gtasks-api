import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'node:path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { EMAIL_QUEUE, EMAIL_SERVICE } from 'src/common/constants';
import { MailConsumer } from 'src/modules/mail/mail.consumer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_HOST'),
          port: config.get<number>('SMTP_PORT'),
          secure: false,
          auth: {
            user: config.get<string>('SMTP_USER'),
            pass: config.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from: '"GTasks" <no-reply@gtasks.dev>',
        },
        template: {
          dir: path.join(__dirname, 'handlebars-templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: EMAIL_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')!],
            queue: EMAIL_QUEUE,
            queueOptions: { durable: true },
          },
        }),
      },
    ]),
  ],
  providers: [
    {
      provide: MailService,
      useFactory: (client: ClientProxy) => {
        return new MailService(client);
      },
      inject: [EMAIL_SERVICE],
    },
  ],
  controllers: [MailConsumer],
  exports: [MailService, ClientsModule],
})
export class MailModule {}
