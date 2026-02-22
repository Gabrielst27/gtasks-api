import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { IUserRepository } from 'src/domain/users/repositories/user.repository';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { SearchUsersUseCase } from 'src/modules/users/usecases/search.usecase';

export namespace FindAllUsers {
  export type Input = SearchManyRequestDto;
  export type Output = SearchResult<UserResponse.Dto>;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: IUserRepository) {}

    async execute(input: Input): Promise<Output> {
      const params: SearchProps = {
        page: input.page,
        perPage: input.perPage,
        sort: input.sort,
        sortDir: input.sortDir,
      };
      const queries = [];
      const search = SearchUsersUseCase.Factory.create(this.repository);
      return await search.execute({ params, queries });
    }
  }
}
