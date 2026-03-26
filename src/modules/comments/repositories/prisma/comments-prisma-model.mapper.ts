import { Comment } from 'generated/prisma/client';
import { CommentEntity } from 'src/domain/comments/entities/comment.entity';

export class CommentsPrismaModelMapper {
  static toModel(entity: CommentEntity): Comment {
    return entity.toJson();
  }
}
