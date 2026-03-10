import { MemberRole } from 'src/domain/teams/enums/member-role.enum';
import { TokenPurposes } from 'src/modules/auth/token-purposes.enum';
import { TeamMemberResponse } from 'src/modules/teams/dtos/responses/team-member-response.dto';
import { TeamResponse } from 'src/modules/teams/dtos/responses/team-response.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace Payload {
  type Props = {
    sub: string;
    purpose: TokenPurposes;
  };

  export type AuthProps = {
    name: string;
    email: string;
    teams: { id: string; role: MemberRole; planId: string }[];
  } & Props;

  export type ResetPasswordProps = { email: string } & Props;

  type PayloadByPurpose = {
    [TokenPurposes.AUTHENTICATION]: Payload.AuthProps;
    [TokenPurposes.PASSWORD_RESET]: Payload.ResetPasswordProps;
  };

  export class Mapper {
    static createUserPayload(
      user: UserResponse.Dto,
      purpose: TokenPurposes,
      teams?: TeamResponse.Dto[],
      membership?: TeamMemberResponse.Dto[],
    ) {
      if (purpose === TokenPurposes.AUTHENTICATION) {
        const userTeams =
          teams?.length && membership?.length
            ? teams.map((team) => {
                const planId = team.planId;
                const membershipInfo = membership.find(
                  (m) => m.teamId === team.id,
                );
                if (!membershipInfo) {
                  return;
                }
                return {
                  id: team.id,
                  role: membershipInfo.role,
                  planId,
                };
              })
            : [];
        return {
          sub: user.id,
          purpose,
          name: user.name,
          email: user.email,
          teams: userTeams,
        } as AuthProps;
      }
      if (purpose === TokenPurposes.PASSWORD_RESET) {
        return {
          sub: user.id,
          purpose,
          email: user.email,
        } as ResetPasswordProps;
      }

      throw new Error('Erro desconhecido ao mapear payload');
    }

    static decode<T extends TokenPurposes>(
      token: any,
      purpose: TokenPurposes,
    ): PayloadByPurpose[T] {
      if (!token || !token.sub || !token.purpose) {
        throw new Error(
          'Erro ao decodificar token: token vazio ou sem propriedades básicas',
        );
      }
      switch (purpose) {
        case TokenPurposes.AUTHENTICATION:
          if (!token.name || !token.email || !token.role) {
            throw new Error(
              'Erro ao decodificar token: token sem propriedades de token de autenticação',
            );
          }
          return {
            sub: token.sub,
            purpose: token.purpose,
            name: token.name,
            email: token.email,
          } as PayloadByPurpose[T];

        case TokenPurposes.PASSWORD_RESET:
          if (!token.email) {
            throw new Error(
              'Erro ao decodificar token: token sem propriedades de token de redefinição de senha',
            );
          }
          return {
            sub: token.sub,
            purpose: token.purpose,
            email: token.email,
          } as PayloadByPurpose[T];

        default:
          throw new Error('Erro ao decodificar token: purpose inválido');
      }
    }
  }
}
