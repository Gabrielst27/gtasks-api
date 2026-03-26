import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/domain/auth/models/payload.model';
import { TokenPurposes } from 'src/modules/auth/token-purposes.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY!,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: Payload.AuthProps | Payload.ResetPasswordProps,
  ): Promise<{ id: string; token: string }> {
    if (payload.purpose === TokenPurposes.PASSWORD_RESET) {
      throw new UnauthorizedException('Token inválido');
    }
    const bearer: string = req.headers['authorization'];
    const id = payload.sub;
    if (!bearer || !id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    const token = bearer.replace('Bearer ', '');
    const user = {
      id,
      token,
    };
    return user;
  }
}
