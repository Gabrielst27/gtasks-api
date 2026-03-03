import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUserDto => {
    const http = ctx.switchToHttp();
    const request = http.getRequest();
    const user: AuthenticatedUserDto = request.user;
    return user;
  },
);
