import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { ICryptography } from 'src/modules/shared/cryptography/cryptography.interface';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace UpdateUserPasswordUseCase {
  export type Input = {
    id: string;
    token: string;
    newPassword: string;
    oldPassword: string;
  };
  export type Output = UserResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(
      private readonly repository: IUserRepository,
      private readonly cryptography: ICryptography,
    ) {}

    async execute(input: Input): Promise<UserResponse.Dto> {
      const { id, newPassword, oldPassword } = input;
      if (!id || !newPassword || !oldPassword) {
        throw new BadRequestException('Dados inválidos');
      }
      const user = await this.repository.findById(id);
      const json = await user.toJson();
      const isSamePassword = await this.cryptography.verifyPassword(
        oldPassword,
        json.password,
      );
      if (!isSamePassword) {
        throw new UnauthorizedException('Senha incorreta');
      }
      const hashPassword = await this.cryptography.generateHash(newPassword);
      user.updatePassword(hashPassword);
      await this.repository.update(id, user);
      return UserResponse.Mapper.toResponse(user);
    }
  }
}
