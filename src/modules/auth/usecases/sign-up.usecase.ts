import { log } from 'console';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';
import { TokenResponse } from 'src/modules/auth/dtos/responses/token.dto';
import { AuthJwtService } from 'src/modules/auth/jwt/jwt.service';
import { CreateUserRequest } from 'src/modules/users/dtos/requests/create-user-request.dto';
import { UsersService } from 'src/modules/users/users.service';

export namespace SignUpUseCase {
  export type Input = SignUpDto;
  export type Output = TokenResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(
      private readonly userService: UsersService,
      private readonly jwtService: AuthJwtService,
    ) {}

    async execute(input: SignUpDto): Promise<TokenResponse.Dto> {
      const userProps = CreateUserRequest.Mapper.mapToRequest(input);
      const newUserProps = await this.userService.create(userProps);
      const token = this.jwtService.sign(newUserProps);
      return token;
    }
  }
}
