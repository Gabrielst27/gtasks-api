import { UnauthorizedException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { Payload } from 'src/modules/auth/jwt/dtos/payload.dto';
import { AuthJwtService } from 'src/modules/auth/jwt/jwt.service';

export namespace DecodeToken {
  export type Input = AuthenticatedUserDto;
  export type Output = Payload.Props;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly jwtService: AuthJwtService) {}

    execute(input: AuthenticatedUserDto): Payload.Props {
      const { id, token } = input;
      if (!id || !token) {
        throw new UnauthorizedException('Usuário não autenticado');
      }
      return this.jwtService.decode(token);
    }
  }
}
