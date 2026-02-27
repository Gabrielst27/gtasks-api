import { BadRequestException } from '@nestjs/common';
import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { AppQueryProps } from 'src/common/utils/app-queries/app-query';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { ITaskRepository } from 'src/domain/tasks/repositories/task-repository';
import { BaseSearchTaskUseCase } from 'src/modules/tasks/usecases/base-search.usecase';
import { makeQueryProps } from 'src/common/utils/app-queries/make-query-props';

export namespace SearchTasksUseCase {
  export type Input = {
    projectId: string;
    searchProps: SearchProps;
    queriesProps?: AppQueryProps[];
  };
  export type Output = SearchResult<TaskResponse.Dto>;

  class UseCase
    extends BaseSearchTaskUseCase
    implements IUseCase<Input, Output>
  {
    constructor(private repository: ITaskRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const { projectId, searchProps, queriesProps } = input;
      if (!projectId) {
        throw new BadRequestException('Busca Inválida');
      }
      const queries = [makeQueryProps('projectId', projectId)];
      if (queriesProps && queriesProps.length) {
        const fields = queriesProps.map((query) => query.field);
        super.validateSearchFields(fields);
        queries.push(...queriesProps);
      }
      if (searchProps.sort) {
        super.validateSortField(searchProps.sort);
      }
      const searchParams = super.makeSearchParams(searchProps);
      const appQueries = super.makeAppQueries(queries);
      const result = await this.repository.findMany(searchParams, appQueries);
      return super.convertToResponse(result);
    }
  }

  export class Factory {
    static create(repository: ITaskRepository): UseCase {
      return new UseCase(repository);
    }
  }
}
