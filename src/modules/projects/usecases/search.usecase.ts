import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { SearchUseCase } from 'src/common/usecases/search.usecase';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { AppQueryProps } from 'src/common/utils/app-queries/app-query';
import { ProjectEntity } from 'src/domain/projects/entities/project.entity';
import { ProjectRepository } from 'src/domain/projects/repositories/projects.repository';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';

export namespace SearchProjectsUseCase {
  export type Input = {
    params: SearchProps;
    queries: AppQueryProps[];
  };

  export type Output = SearchResult<ProjectResponse.Dto>;

  class UseCase
    extends SearchUseCase<ProjectEntity, ProjectResponse.Dto>
    implements IUseCase<Input, Output>
  {
    constructor(private repository: ProjectRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const { queries, params } = input;
      if (queries.length) {
        const fields = queries.map((query) => query.field);
        this.repository.validateSearchFields(fields);
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
      entityResult: SearchResult<ProjectEntity>,
    ): SearchResult<ProjectResponse.Dto> {
      const responses = entityResult.items.map((item) =>
        ProjectResponse.Mapper.toResponse(item),
      );
      return {
        ...entityResult,
        items: responses,
      };
    }
  }

  export class Factory {
    static create(repository: ProjectRepository): UseCase {
      return new UseCase(repository);
    }
  }
}
