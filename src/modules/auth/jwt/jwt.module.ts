import { Module } from '@nestjs/common';
import { AuthJwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type StringValue = '1d' | '30d';

@Module({
  imports: [
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
  providers: [AuthJwtService],
  exports: [AuthJwtService],
})
export class AuthJwtModule {}
