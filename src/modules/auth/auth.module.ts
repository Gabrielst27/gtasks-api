import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthJwtModule } from './jwt/jwt.module';

@Module({
  imports: [UsersModule, PassportModule, AuthJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
