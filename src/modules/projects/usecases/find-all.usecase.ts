import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';
import { IProjectRepository } from 'src/domain/projects/repositories/projects.repository';
import { SearchProjectsUseCase } from 'src/modules/projects/usecases/search.usecase';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';

export namespace FindAllProjectsUseCase {
  export type Input = SearchManyRequestDto;

  export type Output = SearchResult<ProjectResponse.Dto>;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: IProjectRepository) {}

    async execute(input: Input): Promise<Output> {
      const searchProps: SearchProps = {
        page: input.page || 0,
        perPage: input.perPage || 15,
        sort: input.sort || 'createdAt',
        sortDir: input.sortDir || 'desc',
      };
      const findMany = SearchProjectsUseCase.Factory.create(this.repository);

      return await findMany.execute({ params: searchProps, queries: [] });
    }
  }
}
