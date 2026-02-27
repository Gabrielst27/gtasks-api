import { Injectable } from '@nestjs/common';
import { SignInDto } from 'src/modules/auth/dtos/requests/sign-in.dto';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';
import { AuthJwtService } from 'src/modules/auth/jwt/jwt.service';
import { SignInUseCase } from 'src/modules/auth/usecases/sign-in.usecase';
import { CredentialsRequest } from 'src/modules/users/dtos/requests/login-request.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: AuthJwtService,
  ) {}

  async signUp(
    data: SignUpDto,
  ): Promise<SignInUseCase.Output & UserResponse.Dto> {
    const user = await this.usersService.create(data);
    const signInUseCase = new SignInUseCase.UseCase(this.jwtService);
    const token = signInUseCase.execute({ id: user.id });
    return { ...user, ...token };
  }

  async signIn(
    data: SignInDto,
  ): Promise<SignInUseCase.Output & UserResponse.Dto> {
    const credentials = CredentialsRequest.Mapper.mapToRequest({
      email: data.email,
      password: data.password,
    });
    const user = await this.usersService.login(credentials);
    const signInUseCase = new SignInUseCase.UseCase(this.jwtService);
    const token = signInUseCase.execute({ id: user.id });
    return { ...user, ...token };
  }
}
