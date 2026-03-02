import { TokenResponse } from 'src/modules/auth/dtos/responses/token.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export type AuthenticatedUserResponse = UserResponse.Dto & TokenResponse.Dto;
