import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SEND_PASSWORD_RESET } from 'src/common/constants';

@Injectable()
export class MailService implements OnModuleInit {
  constructor(private readonly client: ClientProxy) {}

  async onModuleInit() {
    try {
      await this.client.connect();
      console.log('RabbitMQ connected');
    } catch (err) {
      console.error('RabbitMQ connection error:', err);
    }
  }

  sendPasswordRequest(email: string, token: string) {
    const url = `${process.env.API_PATH}/auth/non-authenticated-reset-password?token=${token}`;
    this.client.emit(SEND_PASSWORD_RESET, { email, url });
  }
}
