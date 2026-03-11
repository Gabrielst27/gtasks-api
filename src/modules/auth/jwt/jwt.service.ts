import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/modules/auth/dtos/token.dto';
import { TokenPurposes } from 'src/modules/auth/token-purposes.enum';
import { Payload } from 'src/modules/auth/jwt/dtos/payload.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { TeamResponse } from 'src/modules/teams/dtos/responses/team-response.dto';
import { MemberResponse } from 'src/modules/teams/dtos/responses/member-response.dto';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(
    user: UserResponse.Dto,
    purpose: TokenPurposes,
    teams?: TeamResponse.Dto[],
    members?: MemberResponse.Dto[],
  ): Token.Dto {
    const payload = Payload.Mapper.createUserPayload(
      user,
      purpose,
      teams,
      members,
    );
    const token = this.jwtService.sign(payload);
    return Token.Mapper.mapToToken(token);
  }

  verifyAuthToken(token: string): Payload.AuthProps {
    try {
      const payload = this.jwtService.verify(token);
      const mapperPayload = Payload.Mapper.decode<TokenPurposes.AUTHENTICATION>(
        payload,
        TokenPurposes.AUTHENTICATION,
      );
      if (mapperPayload.purpose !== TokenPurposes.AUTHENTICATION) {
        throw UnauthorizedException;
      }
      return mapperPayload;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }

  verifyResetPasswordToken(token: string): Payload.ResetPasswordProps {
    try {
      const payload = this.jwtService.verify(token);
      const mappedPayload = Payload.Mapper.decode<TokenPurposes.PASSWORD_RESET>(
        payload,
        TokenPurposes.PASSWORD_RESET,
      );
      if (mappedPayload.purpose !== TokenPurposes.PASSWORD_RESET) {
        throw UnauthorizedException;
      }
      return mappedPayload;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
