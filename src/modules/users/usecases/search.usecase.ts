import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { AppQueryProps } from 'src/common/utils/app-queries/app-query';
import { makeQueryProps } from 'src/common/utils/app-queries/make-query-props';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { BaseSearchUserUseCase } from 'src/modules/users/usecases/base-search.usecase';

export namespace SearchUsersUseCase {
  export type Input = {
    params: SearchProps;
    queries?: AppQueryProps[];
  };

  export type Output = SearchResult<UserResponse.Dto>;

  export class UseCase
    extends BaseSearchUserUseCase
    implements IUseCase<Input, Output>
  {
    constructor(private repository: IUserRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const { params } = input;
      const queries = [makeQueryProps('disabledAt', null)];
      if (input.queries && input.queries.length) {
        const searchFields = input.queries.map((query) => query.field);
        super.validateSearchFields(searchFields);
        queries.push(...input.queries);
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
