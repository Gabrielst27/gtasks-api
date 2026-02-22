import { Module } from '@nestjs/common';
import { BcryptjsService } from './bcryptjs/bcryptjs.service';
import { BcryptjsModule } from './bcryptjs/bcryptjs.module';

@Module({
  providers: [BcryptjsService],
  imports: [BcryptjsModule]
})
export class CryptographyModule {}
