import { Repository } from 'src/common/repositories/repository';
import { IRepository } from 'src/common/repositories/repository.interface';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { CommentEntity } from 'src/domain/comments/entities/comment.entity';

interface ICommentRepository extends IRepository<CommentEntity> {}

export abstract class CommentRepository
  extends Repository
  implements ICommentRepository
{
  protected get searchableFields(): string[] {
    return [...super.searchableFields, 'authorId', 'taskId'];
  }

  protected get sortableFields(): string[] {
    return [...super.sortableFields];
  }

  abstract findById(id: string): Promise<CommentEntity>;
  abstract findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<CommentEntity>>;
  abstract create(item: CommentEntity): Promise<CommentEntity>;
  abstract update(id: string, item: CommentEntity): Promise<CommentEntity>;
  abstract delete(id: string): Promise<CommentEntity>;
}
