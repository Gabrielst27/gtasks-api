import { Injectable } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { ICryptography } from 'src/modules/shared/cryptography/cryptography.interface';
import { CreateUserRequest } from 'src/modules/users/dtos/requests/create-user-request.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { CreateUserUseCase } from 'src/modules/users/usecases/create.usecase';
import { LoginUseCase } from 'src/modules/users/usecases/login.usecase';
import { FindUserByIdUseCase } from 'src/modules/users/usecases/find-by-id.usecase';
import { CredentialsRequest } from 'src/modules/users/dtos/requests/login-request.dto';
import { SearchProps } from 'src/common/repositories/search-params';
import { SearchUsersUseCase } from 'src/modules/users/usecases/search.usecase';
import { UpdateUserPasswordRequest } from 'src/modules/users/dtos/requests/update-password.dto';
import { UpdateUserPasswordUseCase } from 'src/modules/users/usecases/update-password.usecase';

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

  async login(credentials: CredentialsRequest.Dto): Promise<UserResponse.Dto> {
    const usecase = new LoginUseCase.UseCase(
      this.repository,
      this.cryptography,
    );
    return await usecase.execute(credentials);
  }

  async findAll(
    params: SearchManyRequestDto,
  ): Promise<SearchResult<UserResponse.Dto>> {
    const searchProps: SearchProps = {
      page: params.page,
      perPage: params.perPage,
      sort: params.sort,
      sortDir: params.sortDir,
    };
    const search = SearchUsersUseCase.Factory.create(this.repository);
    return await search.execute({ params: searchProps });
  }

  async create(data: CreateUserRequest.Dto): Promise<UserResponse.Dto> {
    const usecase = new CreateUserUseCase.UseCase(
      this.repository,
      this.cryptography,
    );
    return await usecase.execute(data);
  }

  async updatePassword(
    id: string,
    token: string,
    data: UpdateUserPasswordRequest.Dto,
  ): Promise<UserResponse.Dto> {
    const usecase = new UpdateUserPasswordUseCase.UseCase(
      this.repository,
      this.cryptography,
    );
    return await usecase.execute({
      id,
      token,
      newPassword: data.newPassword,
      oldPassword: data.oldPassword,
    });
  }
}
