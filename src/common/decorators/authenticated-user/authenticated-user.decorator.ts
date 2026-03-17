import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUserModel } from 'src/domain/auth/models/authenticated-user.model';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUserModel => {
    const http = ctx.switchToHttp();
    const request = http.getRequest();
    const user: AuthenticatedUserModel = request.user;
    return user;
  },
);
