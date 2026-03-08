import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from 'src/domain/users/enum/role.enum';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { ResetPasswordDto } from 'src/modules/auth/dtos/requests/reset-password.dto';
import { SignInDto } from 'src/modules/auth/dtos/requests/sign-in.dto';
import { SignUpDto } from 'src/modules/auth/dtos/requests/sign-up.dto';
import { Token } from 'src/modules/auth/dtos/token.dto';
import { AuthJwtService } from 'src/modules/auth/jwt/jwt.service';
import { CredentialsRequest } from 'src/modules/users/dtos/requests/login-request.dto';
import { UsersService } from 'src/modules/users/users.service';
import { MailService } from 'src/modules/mail/mail.service';
import { TokenPurposes } from 'src/modules/auth/jwt-purposes.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: AuthJwtService,
    private readonly mailService: MailService,
  ) {}

  async signUp(data: SignUpDto): Promise<Token.Dto> {
    const user = await this.usersService.create(data);
    const token = this.jwtService.sign(user, TokenPurposes.AUTHENTICATION);
    return token;
  }

  async signIn(data: SignInDto): Promise<Token.Dto> {
    const credentials = CredentialsRequest.Mapper.mapToRequest({
      email: data.email,
      password: data.password,
    });
    const user = await this.usersService.login(credentials);
    const token = this.jwtService.sign(user, TokenPurposes.AUTHENTICATION);
    return token;
  }

  async forgotPassword(email: string): Promise<string> {
    const user = await this.usersService.findByEmail(email);
    const token = this.jwtService.sign(user, TokenPurposes.PASSWORD_RESET);
    await this.mailService.sendPasswordRequest(user.email, token.token);
    return 'Requisição de senha enviada ao email informado';
  }

  async resetPassword(data: ResetPasswordDto) {
    console.log('Acionou o reset password');
  }

  verifyAdmin(authUser: AuthenticatedUserDto): void {
    const payload = this.jwtService.decodeAuthToken(authUser.token);
    if (payload.role !== Role.ADMIN) {
      throw new ForbiddenException('Usuário sem permissão');
    }
  }
}
