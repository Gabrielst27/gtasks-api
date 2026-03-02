import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { ICryptography } from 'src/modules/shared/cryptography/cryptography.interface';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace LoginUseCase {
  export type Input = { email: string; password: string };
  export type Output = UserResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(
      private repository: IUserRepository,
      private readonly criptography: ICryptography,
    ) {}

    async execute(input: Input): Promise<UserResponse.Dto> {
      const { email, password } = input;
      if (!email || !password) {
        throw new BadRequestException('Credencial(is) vazia(s)');
      }
      const user = await this.repository.findByEmail(email);
      await this.checkPassword(user, password);
      return UserResponse.Mapper.toResponse(user);
    }

    private async checkPassword(
      user: UserEntity,
      password: string,
    ): Promise<void> {
      const json = user.toJson();
      const isValid = await this.criptography.verifyPassword(
        password,
        json.password,
      );
      if (!isValid) {
        throw new UnauthorizedException('Credenciais inválidas');
      }
    }
  }
}
