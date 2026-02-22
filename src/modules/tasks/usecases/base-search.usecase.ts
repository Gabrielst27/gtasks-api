import { SearchResult } from 'src/common/repositories/search-result';
import { SearchUseCase } from 'src/common/usecases/search.usecase';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';

export abstract class BaseSearchTaskUseCase extends SearchUseCase<
  TaskEntity,
  TaskResponse.Dto
> {
  protected get searchableFields(): string[] {
    return [
      ...super.searchableFields,
      'title',
      'status',
      'priority',
      'createdById',
      'assigneeId',
      'projectId',
    ];
  }

  protected get sortableFields(): string[] {
    return [...super.searchableFields, 'title'];
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
