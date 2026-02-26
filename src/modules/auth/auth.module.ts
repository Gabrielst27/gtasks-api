import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useFactory: (
        usersService: UsersService,
        jwtService: JwtService,
        repository: IUserRepository,
      ) => {
        return new AuthService(usersService, jwtService);
      },
      inject: [UsersService, JwtService],
    },
  ],
})
export class AuthModule {}
