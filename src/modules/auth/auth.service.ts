import { Injectable } from '@nestjs/common';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { ResetPasswordDto } from 'src/modules/auth/dtos/requests/reset-password.dto';
import { SignInDto } from 'src/modules/auth/dtos/requests/sign-in.dto';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';
import { AuthenticatedUserResponse } from 'src/modules/auth/dtos/responses/authenticated-user-response.dto';
import { AuthJwtService } from 'src/modules/auth/jwt/jwt.service';
import { SignInUseCase } from 'src/modules/auth/usecases/sign-in.usecase';
import { CredentialsRequest } from 'src/modules/users/dtos/requests/login-request.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: AuthJwtService,
  ) {}

  async signUp(data: SignUpDto): Promise<AuthenticatedUserResponse> {
    const user = await this.usersService.create(data);
    const signInUseCase = new SignInUseCase.UseCase(this.jwtService);
    const token = signInUseCase.execute({ id: user.id });
    return { ...user, ...token };
  }

  async signIn(data: SignInDto): Promise<AuthenticatedUserResponse> {
    const credentials = CredentialsRequest.Mapper.mapToRequest({
      email: data.email,
      password: data.password,
    });
    const user = await this.usersService.login(credentials);
    const signInUseCase = new SignInUseCase.UseCase(this.jwtService);
    const token = signInUseCase.execute({ id: user.id });
    return { ...user, ...token };
  }

  async resetPassword(
    authUser: AuthenticatedUserDto,
    data: ResetPasswordDto,
  ): Promise<AuthenticatedUserResponse> {
    const user = await this.usersService.updatePassword(
      authUser.id,
      authUser.token,
      data,
    );
    return { ...user, token: authUser.token };
  }
}
