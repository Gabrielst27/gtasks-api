import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from 'src/modules/auth/dtos/responses/token.dto';
import { Payload } from 'src/modules/auth/jwt/dtos/payload.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(user: UserResponse.Dto): TokenResponse.Dto {
    const payload = Payload.Mapper.mapUserToResponse(user);
    const token = this.jwtService.sign(payload);
    return TokenResponse.Mapper.mapToResponse(token);
  }

  decode(token: string): Payload.Props {
    const payload = this.jwtService.decode(token);
    return Payload.Mapper.mapPayloadToResponse(payload);
  }
}
