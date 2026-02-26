import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';
import { TokenResponse } from 'src/modules/auth/dtos/responses/token.dto';
import { SignUpUseCase } from 'src/modules/auth/usecases/sign-up.usecase';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto): Promise<TokenResponse.Dto> {
    const usecase = new SignUpUseCase.UseCase(this.usersService);
    return await usecase.execute(data);
  }
}
