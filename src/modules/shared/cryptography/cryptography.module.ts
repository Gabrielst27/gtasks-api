import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/modules/shared/cryptography/bcrypt/bcrypt.module';
import { BcryptService } from 'src/modules/shared/cryptography/bcrypt/bcrypt.service';

@Module({
  providers: [BcryptService],
  imports: [BcryptModule],
})
export class CryptographyModule {}
