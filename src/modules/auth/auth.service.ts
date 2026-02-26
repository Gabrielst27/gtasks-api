import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto) {}
}
