import { Injectable } from '@nestjs/common';
import { IMailService } from 'src/modules/mail/mail.service.interface';

@Injectable()
export class MailService implements IMailService {}
