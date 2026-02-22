import { Module } from '@nestjs/common';
import { BcryptjsService } from 'src/modules/shared/cryptography/bcryptjs/bcryptjs.service';

@Module({
  providers: [BcryptjsService],
})
export class BcryptjsModule {}
