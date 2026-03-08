import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { CommentEntity } from 'src/domain/comments/entities/comment.entity';
import { CommentRepository } from 'src/domain/comments/repositories/comment.repository';
import { CommentsResponse } from 'src/modules/comments/dto/responses/comments-response.dto';

export namespace CreateComment {
  export type Input = {
    authorId: string;
    taskId: string;
    content: string;
  };

  export type Output = CommentsResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly repository: CommentRepository) {}

    async execute(input: Input): Promise<CommentsResponse.Dto> {
      const { authorId, taskId, content } = input;
      if (!authorId || !taskId || !content) {
        throw new BadRequestException('Dados inválidos');
      }
      const entity = new CommentEntity({ authorId, taskId, content });
      const result = await this.repository.create(entity);
      return CommentsResponse.Mapper.entityToResponse(result);
    }
  }
}
