import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthJwtModule } from './jwt/jwt.module';
import { SharedModule } from 'src/modules/shared/shared.module';
import { MailModule } from 'src/modules/mail/mail.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    AuthJwtModule,
    SharedModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
