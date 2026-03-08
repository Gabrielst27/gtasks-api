import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/modules/auth/dtos/token.dto';
import { TokenPurposes } from 'src/modules/auth/jwt-purposes.enum';
import { Payload } from 'src/modules/auth/jwt/dtos/payload.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(user: UserResponse.Dto, purpose: TokenPurposes): Token.Dto {
    const payload = Payload.Mapper.create(user, purpose);
    const token = this.jwtService.sign(payload);
    return Token.Mapper.mapToToken(token);
  }

  decodeAuthToken(token: string): Payload.AuthProps {
    const payload = this.jwtService.decode(token);
    return Payload.Mapper.decode<TokenPurposes.AUTHENTICATION>(
      payload,
      TokenPurposes.AUTHENTICATION,
    );
  }

  decodeResetPasswordToken(token: string): Payload.ResetPasswordProps {
    const payload = this.jwtService.decode(token);
    return Payload.Mapper.decode<TokenPurposes.PASSWORD_RESET>(
      payload,
      TokenPurposes.PASSWORD_RESET,
    );
  }
}
