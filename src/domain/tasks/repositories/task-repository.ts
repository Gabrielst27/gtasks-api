import { Repository } from 'src/common/repositories/repository';
import { IRepository } from 'src/common/repositories/repository.interface';
import { SearchParams } from 'src/common/repositories/search-params';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';

interface ITaskRepository extends IRepository<TaskEntity> {}

export abstract class TaskRepository
  extends Repository
  implements ITaskRepository
{
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
    return [...super.sortableFields, 'title'];
  }

  abstract findById(id: string);
  abstract findMany(params: SearchParams, queries: AppQuery[]);
  abstract create(item: TaskEntity);
  abstract update(id: string, item: TaskEntity);
  abstract delete(id: string);
}
