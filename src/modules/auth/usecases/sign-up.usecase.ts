import { IUseCase } from 'src/common/usecases/usecase.interface';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';
import { TokenResponse } from 'src/modules/auth/dtos/responses/token.dto';
import { CreateUserRequest } from 'src/modules/users/dtos/requests/create-user-request.dto';
import { UsersService } from 'src/modules/users/users.service';

export namespace SignUpUseCase {
  export type Input = SignUpDto;
  export type Output = TokenResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private userService: UsersService) {}

    async execute(input: SignUpDto): Promise<TokenResponse.Dto> {
      const userProps = CreateUserRequest.Mapper.mapToRequest(input);
      await this.userService.create(userProps);
      //TODO: implement authentication and return jwt token
      return {};
    }
  }
}
