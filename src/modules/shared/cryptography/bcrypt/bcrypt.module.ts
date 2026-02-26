import { Module } from '@nestjs/common';
import { BcryptService } from 'src/modules/shared/cryptography/bcrypt/bcrypt.service';

@Module({
  providers: [BcryptService],
})
export class BcryptModule {}
