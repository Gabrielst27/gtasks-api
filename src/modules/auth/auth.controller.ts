import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';
import { SignInDto } from 'src/modules/auth/dtos/requests/sign-in.dto';
import { ResetPasswordDto } from 'src/modules/auth/dtos/requests/reset-password.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user/authenticated-user.decorator';
import { AuthenticatedUserRequestDto } from 'src/modules/auth/dtos/requests/authenticated-user-request.dto';

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

  @Put('reset-password')
  @UseGuards(JwtAuthGuard)
  resetPassword(
    @AuthenticatedUser() authUser: AuthenticatedUserRequestDto,
    @Body() data: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(authUser, data);
  }
}
