import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace Payload {
  type Props = {
    sub: string;
  };

  export class Mapper {
    static mapToResponse(user: UserResponse.Dto): Props {
      return {
        sub: user.id,
      };
    }
  }
}
