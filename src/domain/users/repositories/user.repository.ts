import { Repository } from 'src/common/repositories/repository';
import { IRepository } from 'src/common/repositories/repository.interface';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { UserEntity } from 'src/domain/users/entities/user-entity';

interface IUserRepository extends IRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
}

export abstract class UserRepository
  extends Repository
  implements IUserRepository
{
  protected get searchableFields(): string[] {
    return [...super.searchableFields, 'name', 'email'];
  }

  protected get sortableFields(): string[] {
    return [...super.searchableFields, 'name'];
  }

  abstract findByEmail(email: string): Promise<UserEntity>;
  abstract findById(id: string): Promise<UserEntity>;
  abstract findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<UserEntity>>;
  abstract create(item: UserEntity): Promise<UserEntity>;
  abstract update(id: string, item: UserEntity): Promise<UserEntity>;
  abstract delete(id: string): Promise<UserEntity>;
}
