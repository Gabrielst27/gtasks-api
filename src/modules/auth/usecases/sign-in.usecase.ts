import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TokenResponse } from 'src/modules/auth/dtos/responses/token.dto';
import { AuthJwtService } from 'src/modules/auth/jwt/jwt.service';

export namespace SignInUseCase {
  export type Input = {
    id: string;
  };
  export type Output = TokenResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly jwtService: AuthJwtService) {}

    execute(input: Input): Output {
      const { id } = input;
      if (!id) {
        throw new BadRequestException('ID inválido');
      }
      return this.jwtService.sign(id);
    }
  }
}
