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
import { TokenPurposes } from 'src/modules/auth/token-purposes.enum';
import { MailService } from 'src/modules/mail/mail.service';
import { TeamsService } from 'src/modules/teams/teams.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: AuthJwtService,
    private readonly teamsService: TeamsService,
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
    const membership = await this.teamsService.findByUser(user.id);
    const teams = membership.items.length
      ? membership.items.map((item) => item.team)
      : [];
    const members = membership.items.length
      ? membership.items.map((item) => item.membership)
      : [];
    const token = this.jwtService.sign(
      user,
      TokenPurposes.AUTHENTICATION,
      teams,
      members,
    );
    return token;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    const token = this.jwtService.sign(user, TokenPurposes.PASSWORD_RESET);
    await this.mailService.sendPasswordRequest(user.email, token.token);
    return {
      message: 'Requisição de redefinição de senha enviada ao email informado',
    };
  }

  async nonAuthResetPassword(
    data: ResetPasswordDto,
  ): Promise<{ message: string }> {
    const payload = this.jwtService.verifyResetPasswordToken(data.token);
    await this.usersService.updatePassword(payload.sub, {
      newPassword: data.newPassword,
    });
    return { message: 'Senha redefinida com sucesso' };
  }

  verifyUserToken(authUser: AuthenticatedUserDto): void {
    this.jwtService.verifyAuthToken(authUser.token);
  }

  verifyAdminToken(authUser: AuthenticatedUserDto): void {
    const payload = this.jwtService.verifyAuthToken(authUser.token);
    if (payload.role !== Role.ADMIN) {
      throw new ForbiddenException('Usuário sem permissão');
    }
  }
}
