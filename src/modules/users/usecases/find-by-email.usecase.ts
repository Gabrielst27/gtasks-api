import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { UserRepository } from 'src/domain/users/repositories/user.repository';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace FindUserByEmailUseCase {
  export type Input = { email: string };
  export type Output = UserResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: UserRepository) {}

    async execute(input: Input): Promise<UserResponse.Dto> {
      if (!input.email) {
        throw new BadRequestException('Busca inválida');
      }
      const user = await this.repository.findByEmail(input.email);
      return UserResponse.Mapper.toResponse(user);
    }
  }
}
