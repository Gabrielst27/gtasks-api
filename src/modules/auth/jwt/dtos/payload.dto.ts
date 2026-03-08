import { Role } from 'src/domain/users/enum/role.enum';
import { TokenPurposes } from 'src/modules/auth/jwt-purposes.enum';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace Payload {
  type Props = {
    sub: string;
    purpose: TokenPurposes;
  };

  export type AuthProps = {
    name: string;
    email: string;
    role: Role;
  } & Props;

  export type ResetPasswordProps = { email: string } & Props;

  type PayloadByPurpose = {
    [TokenPurposes.AUTHENTICATION]: Payload.AuthProps;
    [TokenPurposes.PASSWORD_RESET]: Payload.ResetPasswordProps;
  };

  export class Mapper {
    static create(payload: UserResponse.Dto, purpose: TokenPurposes) {
      if (
        payload instanceof UserResponse.Dto &&
        purpose === TokenPurposes.AUTHENTICATION
      ) {
        return {
          sub: payload.id,
          purpose,
          name: payload.name,
          email: payload.email,
          role: payload.role,
        } as AuthProps;
      }
      if (
        payload instanceof UserResponse.Dto &&
        purpose === TokenPurposes.PASSWORD_RESET
      ) {
        return {
          sub: payload.id,
          purpose,
          email: payload.email,
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
          return {
            sub: token.sub,
            purpose,
            name: token.name,
            email: token.email,
            role: token.role,
          } as PayloadByPurpose[T];

        case TokenPurposes.PASSWORD_RESET:
          return {
            sub: token.id,
            purpose,
            email: token.email,
          } as PayloadByPurpose[T];

        default:
          throw new Error('Erro ao decodificar token: purpose inválido');
      }
    }
  }
}
