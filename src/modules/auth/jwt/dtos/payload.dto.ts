import { Role } from 'src/domain/users/enum/role.enum';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace Payload {
  export type Props = {
    sub: string;
    name: string;
    email: string;
    role: Role;
  };

  export class Mapper {
    static mapUserToResponse(user: UserResponse.Dto): Props {
      return {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }

    static mapPayloadToResponse(payload: any): Props {
      return {
        sub: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };
    }
  }
}
