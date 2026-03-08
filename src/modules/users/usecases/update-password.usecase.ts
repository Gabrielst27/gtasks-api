import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { UserRepository } from 'src/domain/users/repositories/user.repository';
import { ICryptography } from 'src/modules/shared/cryptography/cryptography.interface';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace UpdateUserPasswordUseCase {
  export type Input = {
    id: string;
    newPassword: string;
  };
  export type Output = UserResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(
      private readonly repository: UserRepository,
      private readonly cryptography: ICryptography,
    ) {}

    async execute(input: Input): Promise<UserResponse.Dto> {
      const { id, newPassword } = input;
      if (!id || !newPassword) {
        throw new BadRequestException('Dados inválidos');
      }
      const user = await this.repository.findById(id);
      const hashPassword = await this.cryptography.generateHash(newPassword);
      user.updatePassword(hashPassword);
      await this.repository.update(id, user);
      return UserResponse.Mapper.toResponse(user);
    }
  }
}
