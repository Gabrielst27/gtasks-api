import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TokenResponse } from 'src/modules/auth/dtos/responses/token.dto';
import { AuthJwtService } from 'src/modules/auth/jwt/jwt.service';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace SignInUseCase {
  export type Input = {
    user: UserResponse.Dto;
  };
  export type Output = TokenResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly jwtService: AuthJwtService) {}

    execute(input: Input): Output {
      const { user } = input;
      if (!user) {
        throw new BadRequestException('Usuário inválido');
      }
      return this.jwtService.sign(user);
    }
  }
}
