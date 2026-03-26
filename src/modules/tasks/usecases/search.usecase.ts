import { BadRequestException } from '@nestjs/common';
import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { AppQueryProps } from 'src/common/utils/app-queries/app-query';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { makeQueryProps } from 'src/common/utils/app-queries/make-query-props';
import { SearchUseCase } from 'src/common/usecases/search.usecase';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';
import { TaskRepository } from 'src/domain/tasks/repositories/task-repository';

export namespace SearchTasksUseCase {
  export type Input = {
    projectId: string;
    searchProps: SearchProps;
    queriesProps?: AppQueryProps[];
  };
  export type Output = SearchResult<TaskResponse.Dto>;

  class UseCase
    extends SearchUseCase<TaskEntity, TaskResponse.Dto>
    implements IUseCase<Input, Output>
  {
    constructor(private repository: TaskRepository) {
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
        this.repository.validateSearchFields(fields);
        queries.push(...queriesProps);
      }
      if (searchProps.sort) {
        this.repository.validateSortField(searchProps.sort);
      }
      const searchParams = super.makeSearchParams(searchProps);
      const appQueries = super.makeAppQueries(queries);
      const result = await this.repository.findMany(searchParams, appQueries);
      return this.convertToResponse(result);
    }

    protected convertToResponse(
      entityResult: SearchResult<TaskEntity>,
    ): SearchResult<TaskResponse.Dto> {
      const responses = entityResult.items.map((item) =>
        TaskResponse.Mapper.toResponse(item),
      );
      return {
        ...entityResult,
        items: responses,
      };
    }
  }

  export class Factory {
    static create(repository: TaskRepository): UseCase {
      return new UseCase(repository);
    }
  }
}
