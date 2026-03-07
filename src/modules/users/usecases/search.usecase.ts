import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { SearchUseCase } from 'src/common/usecases/search.usecase';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { AppQueryProps } from 'src/common/utils/app-queries/app-query';
import { makeQueryProps } from 'src/common/utils/app-queries/make-query-props';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { UserRepository } from 'src/domain/users/repositories/user.repository';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';

export namespace SearchUsersUseCase {
  export type Input = {
    params: SearchProps;
    queries?: AppQueryProps[];
  };

  export type Output = SearchResult<UserResponse.Dto>;

  export class UseCase
    extends SearchUseCase<UserEntity, UserResponse.Dto>
    implements IUseCase<Input, Output>
  {
    constructor(private repository: UserRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const { params } = input;
      const queries = [makeQueryProps('disabledAt', null)];
      if (input.queries && input.queries.length) {
        const searchFields = input.queries.map((query) => query.field);
        this.repository.validateSearchFields(searchFields);
        queries.push(...input.queries);
      }
      if (params.sort) {
        this.repository.validateSortField(params.sort);
      }
      const appQueries = super.makeAppQueries(queries);
      const searchParams = super.makeSearchParams(params);
      const result = await this.repository.findMany(searchParams, appQueries);
      return this.convertToResponse(result);
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

  export class Factory {
    static create(repository: UserRepository): UseCase {
      return new UseCase(repository);
    }
  }
}
