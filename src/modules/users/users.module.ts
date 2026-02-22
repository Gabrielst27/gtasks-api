import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/modules/shared/shared.module';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { UserPrismaRepository } from 'src/modules/users/repositories/user-prisma.repository';
import { ICryptography } from 'src/modules/shared/cryptography/cryptography.interface';
import { BcryptjsService } from 'src/modules/shared/cryptography/bcryptjs/bcryptjs.service';

@Module({
  imports: [SharedModule],
  providers: [
    PrismaService,
    BcryptjsService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: UsersService,
      useFactory: (
        repository: IUserRepository,
        cryptography: ICryptography,
      ) => {
        return new UsersService(repository, cryptography);
      },
      inject: ['Repository', BcryptjsService],
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
