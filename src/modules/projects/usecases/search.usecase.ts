import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { AppQueryProps } from 'src/common/utils/app-queries/app-query';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';
import { IProjectRepository } from 'src/domain/projects/repositories/projects.repository';
import { BaseSearchProjectUseCase } from 'src/modules/projects/usecases/base-search.usecase';

export namespace SearchProjectsUseCase {
  export type Input = {
    params: SearchProps;
    queries: AppQueryProps[];
  };

  export type Output = SearchResult<ProjectResponse.Dto>;

  class UseCase
    extends BaseSearchProjectUseCase
    implements IUseCase<Input, Output>
  {
    constructor(private repository: IProjectRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const { queries, params } = input;
      if (queries.length) {
        const fields = queries.map((query) => query.field);
        super.validateSearchFields(fields);
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
    static create(repository: IProjectRepository): UseCase {
      return new UseCase(repository);
    }
  }
}
