import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { TokenResponse } from 'src/modules/auth/dtos/responses/token.dto';
import { Payload } from 'src/modules/auth/jwt/dtos/payload.dto';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(id: string): TokenResponse.Dto {
    const payload = Payload.Mapper.mapToResponse(id);
    const token = this.jwtService.sign(payload);
    return TokenResponse.Mapper.mapToResponse(token);
  }
}
