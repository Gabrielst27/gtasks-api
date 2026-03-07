import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { UserRepository } from 'src/domain/users/repositories/user.repository';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace FindUserByIdUseCase {
  export type Input = { id: string };
  export type Output = UserResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: UserRepository) {}

    async execute(input: Input): Promise<UserResponse.Dto> {
      if (!input.id) {
        throw new BadRequestException('Busca inválida');
      }
      const user = await this.repository.findById(input.id);
      return UserResponse.Mapper.toResponse(user);
    }
  }
}
