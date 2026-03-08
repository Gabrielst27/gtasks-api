import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommentRepository } from 'src/domain/comments/repositories/comment.repository';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { CommentRequestDto } from 'src/modules/comments/dto/requests/comments-request.dto';
import { CommentsResponse } from 'src/modules/comments/dto/responses/comments-response.dto';
import { CreateComment } from 'src/modules/comments/usecases/create.usecase';

@Injectable()
export class CommentsService {
  constructor(private readonly repository: CommentRepository) {}

  async create(
    authUser: AuthenticatedUserDto,
    taskId: string,
    data: CommentRequestDto,
  ): Promise<CommentsResponse.Dto> {
    if (!authUser) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    const create = new CreateComment.UseCase(this.repository);
    return await create.execute({
      authorId: authUser.id,
      taskId,
      content: data.content,
    });
  }
}
