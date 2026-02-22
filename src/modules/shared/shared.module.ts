import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CryptographyModule } from './cryptography/cryptography.module';

@Module({
  imports: [PrismaModule, CryptographyModule],
})
export class SharedModule {}
