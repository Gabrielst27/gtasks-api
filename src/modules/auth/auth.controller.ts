import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  signup(@Body() data: SignUpDto) {
    // return this.authService.signup(data)
  }
}
