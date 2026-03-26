import { BadRequestException, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { UserRepository } from 'src/domain/users/repositories/user.repository';
import { ICryptography } from 'src/common/utils/cryptography/cryptography.interface';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace CreateUser {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = UserResponse.Dto;

  @Injectable()
  export class UseCase implements IUseCase<Input, Output> {
    constructor(
      private repository: UserRepository,
      private cryptography: ICryptography,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { name, email, password } = input;
      if (!name || !email || !password) {
        throw new BadRequestException('Dados inválidos');
      }
      const hash = await this.cryptography.generateHash(password);
      //TODO: implement avatar storage
      const user = new UserEntity({ ...input, password: hash });
      const result = await this.repository.create(user);
      return UserResponse.Mapper.toResponse(result);
    }
  }
}
