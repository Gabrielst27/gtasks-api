import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() data: SignUpDto) {
    return this.authService.signUp(data);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signin(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data.email);
  }

  @Put('non-authenticated-reset-password')
  @HttpCode(HttpStatus.OK)
  nonAuthResetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.nonAuthResetPassword(data);
  }
}
