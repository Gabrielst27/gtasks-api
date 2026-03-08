import { Injectable } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { TaskRequestDto } from 'src/modules/tasks/dtos/requests/task-request.dto';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { TaskRepository } from 'src/domain/tasks/repositories/task-repository';
import { CreateTaskUseCase } from 'src/modules/tasks/usecases/create.usecase';
import { FindTaskByIdUseCase } from 'src/modules/tasks/usecases/find-by-id.usecase';
import { UpdateTaskUseCase } from 'src/modules/tasks/usecases/update.usecase';
import { SearchTasksUseCase } from 'src/modules/tasks/usecases/search.usecase';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';

@Injectable()
export class TasksService {
  constructor(private repository: TaskRepository) {}

  async findById(id: string): Promise<TaskResponse.Dto> {
    const usecase = new FindTaskByIdUseCase.UseCase(this.repository);
    return await usecase.execute({ id });
  }

  async findAllByProject(
    projectId: string,
    params: SearchManyRequestDto,
  ): Promise<SearchResult<TaskResponse.Dto>> {
    const findMany = SearchTasksUseCase.Factory.create(this.repository);
    return await findMany.execute({
      projectId,
      searchProps: params,
    });
  }

  async create(
    authUser: AuthenticatedUserDto,
    projectId: string,
    request: TaskRequestDto,
  ): Promise<TaskResponse.Dto> {
    const usecase = new CreateTaskUseCase.UseCase(this.repository);
    return await usecase.execute({
      ...request,
      createdById: authUser.id,
      projectId,
    });
  }

  async update(id: string, request: TaskRequestDto): Promise<TaskResponse.Dto> {
    const usecase = new UpdateTaskUseCase.UseCase(this.repository);
    return await usecase.execute({ id, ...request });
  }
}
