import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const http = ctx.switchToHttp();
    const request = http.getRequest();
    const user = request.user;

    if (!user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return user;
  },
);
