import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/modules/shared/shared.module';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { UserPrismaRepository } from 'src/modules/users/repositories/user-prisma.repository';
import { ICryptography } from 'src/modules/shared/cryptography/cryptography.interface';
import { BcryptService } from 'src/modules/shared/cryptography/bcrypt/bcrypt.service';
import { UserRepository } from 'src/domain/users/repositories/user.repository';

@Module({
  imports: [SharedModule],
  providers: [
    PrismaService,
    BcryptService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: UsersService,
      useFactory: (repository: UserRepository, cryptography: ICryptography) => {
        return new UsersService(repository, cryptography);
      },
      inject: ['Repository', BcryptService],
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
