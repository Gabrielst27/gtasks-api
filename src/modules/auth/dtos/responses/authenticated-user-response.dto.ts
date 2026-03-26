import { Token } from 'src/modules/auth/dtos/token.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export type AuthenticatedUserResponse = UserResponse.Dto & Token.Dto;
