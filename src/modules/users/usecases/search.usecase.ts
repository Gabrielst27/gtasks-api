import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { AppQueryProps } from 'src/common/utils/app-queries/app-query';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { BaseSearchUserUseCase } from 'src/modules/users/usecases/base-search.usecase';

export namespace SearchUsersUseCase {
  export type Input = {
    params: SearchProps;
    queries: AppQueryProps[];
  };

  export type Output = SearchResult<UserResponse.Dto>;

  class UseCase
    extends BaseSearchUserUseCase
    implements IUseCase<Input, Output>
  {
    constructor(private repository: IUserRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const { queries, params } = input;
      if (queries.length) {
        const searchFields = queries.map((query) => query.field);
        super.validateSearchFields(searchFields);
      }
      if (params.sort) {
        super.validateSortField(params.sort);
      }
      const appQueries = super.makeAppQueries(queries);
      const searchParams = super.makeSearchParams(params);
      const result = await this.repository.findMany(searchParams, appQueries);
      return super.convertToResponse(result);
    }
  }

  export class Factory {
    static create(repository: IUserRepository): UseCase {
      return new UseCase(repository);
    }
  }
}
