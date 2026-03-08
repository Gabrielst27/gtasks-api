import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';
import { SignInDto } from 'src/modules/auth/dtos/requests/sign-in.dto';
import { ResetPasswordDto } from 'src/modules/auth/dtos/requests/reset-password.dto';
import { ForgotPasswordDto } from 'src/modules/auth/dtos/requests/forgot-password.dto';

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

  @Post('forgot-password')
  forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data.email);
  }

  @Put('reset-password')
  resetPassword(@Query() data: ResetPasswordDto) {
    console.log('chegou aqui');
    return this.authService.resetPassword(data);
  }
}
