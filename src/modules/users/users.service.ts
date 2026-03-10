import { Inject, Injectable } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { CreateUserRequest } from 'src/modules/users/dtos/requests/create-user-request.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { CreateUser } from 'src/modules/users/usecases/create.usecase';
import { Login } from 'src/modules/users/usecases/login.usecase';
import { FindUserById } from 'src/modules/users/usecases/find-by-id.usecase';
import { CredentialsRequest } from 'src/modules/users/dtos/requests/login-request.dto';
import { SearchProps } from 'src/common/repositories/search-params';
import { SearchUsers } from 'src/modules/users/usecases/search.usecase';
import { UpdateUserPasswordRequest } from 'src/modules/users/dtos/requests/update-password.dto';
import { UpdateUserPassword } from 'src/modules/users/usecases/update-password.usecase';
import { FindUserByEmail } from 'src/modules/users/usecases/find-by-email.usecase';

@Injectable()
export class UsersService {
  @Inject(Login.UseCase)
  private readonly loginUsecase: Login.UseCase;

  @Inject(FindUserById.UseCase)
  private readonly findByIdUsecase: FindUserById.UseCase;

  @Inject(FindUserByEmail.UseCase)
  private readonly findByEmailUsecase: FindUserByEmail.UseCase;

  @Inject(SearchUsers.UseCase)
  private readonly searchUsersUsecase: SearchUsers.UseCase;

  @Inject(CreateUser.UseCase)
  private readonly createUsecase: CreateUser.UseCase;

  @Inject(UpdateUserPassword.UseCase)
  private readonly updatePasswordUsecase: UpdateUserPassword.UseCase;

  constructor() {}

  async findById(id: string): Promise<UserResponse.Dto> {
    return await this.findByIdUsecase.execute({ id });
  }

  async findByEmail(email: string): Promise<UserResponse.Dto> {
    return await this.findByEmailUsecase.execute({ email });
  }

  async login(credentials: CredentialsRequest.Dto): Promise<UserResponse.Dto> {
    return await this.loginUsecase.execute(credentials);
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
    return await this.searchUsersUsecase.execute({ params: searchProps });
  }

  async create(data: CreateUserRequest.Dto): Promise<UserResponse.Dto> {
    return await this.createUsecase.execute(data);
  }

  async updatePassword(
    id: string,
    data: UpdateUserPasswordRequest.Dto,
  ): Promise<UserResponse.Dto> {
    return await this.updatePasswordUsecase.execute({
      id,
      newPassword: data.newPassword,
    });
  }
}
