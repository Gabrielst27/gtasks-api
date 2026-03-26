import { Module } from '@nestjs/common';
import { AuthJwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/modules/auth/jwt/jwt.strategy';
import { UsersModule } from 'src/modules/users/users.module';

type StringValue = '1d' | '30d';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY')!,
        signOptions: {
          expiresIn: config.get<StringValue>('JWT_EXPIRES_IN')!,
        },
      }),
    }),
  ],
  providers: [AuthJwtService, JwtStrategy],
  exports: [AuthJwtService],
})
export class AuthJwtModule {}
