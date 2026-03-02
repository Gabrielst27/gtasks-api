import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUserRequestDto } from 'src/modules/auth/dtos/requests/authenticated-user-request.dto';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUserRequestDto => {
    const http = ctx.switchToHttp();
    const request = http.getRequest();
    const user: AuthenticatedUserRequestDto = request.user;
    return user;
  },
);
