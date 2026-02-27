import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';
import { SignInDto } from 'src/modules/auth/dtos/requests/sign-in.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signup(@Body() data: SignUpDto) {
    return this.authService.signUp(data);
  }

  @Post('sign-in')
  signin(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }
}
