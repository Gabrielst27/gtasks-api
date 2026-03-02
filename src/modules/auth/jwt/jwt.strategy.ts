import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from 'src/modules/auth/jwt/dtos/payload.dto';

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
    payload: Payload.Props,
  ): Promise<{ id: string; token: string }> {
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
