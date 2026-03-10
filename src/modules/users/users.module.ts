import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/modules/shared/shared.module';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { UserPrismaRepository } from 'src/modules/users/repositories/user-prisma.repository';
import { ICryptography } from 'src/modules/shared/cryptography/cryptography.interface';
import { BcryptService } from 'src/modules/shared/cryptography/bcrypt/bcrypt.service';
import { UserRepository } from 'src/domain/users/repositories/user.repository';
import { FindUserById } from 'src/modules/users/usecases/find-by-id.usecase';
import { FindUserByEmail } from 'src/modules/users/usecases/find-by-email.usecase';
import { Login } from 'src/modules/users/usecases/login.usecase';
import { SearchUsers } from 'src/modules/users/usecases/search.usecase';
import { CreateUser } from 'src/modules/users/usecases/create.usecase';
import { UpdateUserPassword } from 'src/modules/users/usecases/update-password.usecase';

@Module({
  imports: [SharedModule],
  providers: [
    PrismaService,
    BcryptService,
    UsersService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: FindUserById.UseCase,
      useFactory: (repository: UserRepository) => {
        return new FindUserById.UseCase(repository);
      },
      inject: ['Repository'],
    },
    {
      provide: FindUserByEmail.UseCase,
      useFactory: (repository: UserRepository) => {
        return new FindUserByEmail.UseCase(repository);
      },
      inject: ['Repository'],
    },
    {
      provide: Login.UseCase,
      useFactory: (repository: UserRepository, cryptography: ICryptography) => {
        return new Login.UseCase(repository, cryptography);
      },
      inject: ['Repository', BcryptService],
    },
    {
      provide: SearchUsers.UseCase,
      useFactory: (repository: UserRepository) => {
        return new SearchUsers.UseCase(repository);
      },
      inject: ['Repository'],
    },
    {
      provide: CreateUser.UseCase,
      useFactory: (repository: UserRepository, cryptography: ICryptography) => {
        return new CreateUser.UseCase(repository, cryptography);
      },
      inject: ['Repository', BcryptService],
    },
    {
      provide: UpdateUserPassword.UseCase,
      useFactory: (repository: UserRepository, cryptography: ICryptography) => {
        return new UpdateUserPassword.UseCase(repository, cryptography);
      },
      inject: ['Repository', BcryptService],
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
