import { Injectable } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { ICryptography } from 'src/modules/shared/cryptography/cryptography.interface';
import { CreateUserRequest } from 'src/modules/users/dtos/requests/create-user-request.dto';
import { UserRequestDto } from 'src/modules/users/dtos/requests/user-request.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { CreateUserUseCase } from 'src/modules/users/usecases/create.usecase';
import { FindAllUsers } from 'src/modules/users/usecases/find-all.usecase';
import { FindUserByIdUseCase } from 'src/modules/users/usecases/find-by-id.usecase';
import { UpdateUserUseCase } from 'src/modules/users/usecases/update.usecase';

@Injectable()
export class UsersService {
  constructor(
    private repository: IUserRepository,
    private cryptography: ICryptography,
  ) {}

  async findById(id: string): Promise<UserResponse.Dto> {
    const usecase = new FindUserByIdUseCase.UseCase(this.repository);
    return await usecase.execute({ id });
  }

  async findAll(
    params: SearchManyRequestDto,
  ): Promise<SearchResult<UserResponse.Dto>> {
    const usecase = new FindAllUsers.UseCase(this.repository);
    return await usecase.execute(params);
  }

  async create(data: CreateUserRequest.Dto): Promise<UserResponse.Dto> {
    const usecase = new CreateUserUseCase.UseCase(
      this.repository,
      this.cryptography,
    );
    return await usecase.execute(data);
  }

  async update(id: string, data: UserRequestDto): Promise<UserResponse.Dto> {
    const usecase = new UpdateUserUseCase.UseCase(this.repository);
    return await usecase.execute({ ...data, id });
  }
}
