import { SearchResult } from 'src/common/repositories/search-result';
import { SearchUseCase } from 'src/common/usecases/search.usecase';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export abstract class BaseSearchUserUseCase extends SearchUseCase<
  UserEntity,
  UserResponse.Dto
> {
  protected get searchableFields(): string[] {
    return [...super.searchableFields, 'name', 'email'];
  }

  protected get sortableFields(): string[] {
    return [...super.searchableFields, 'name'];
  }

  protected convertToResponse(
    entityResult: SearchResult<UserEntity>,
  ): SearchResult<UserResponse.Dto> {
    const responses = entityResult.items.map((item) =>
      UserResponse.Mapper.toResponse(item),
    );
    return {
      ...entityResult,
      items: responses,
    };
  }
}
