import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';
import { TaskRepository } from 'src/domain/tasks/repositories/task-repository';
import { TaskStatus } from 'src/domain/tasks/enums/status';
import { TaskPriority } from 'src/domain/tasks/enums/priority';

export namespace CreateTaskUseCase {
  export type Input = {
    title: string;
    description?: string;
    slug: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: Date;
    projectId: string;
    createdById: string;
    assigneeId: string;
  };

  export type Output = TaskResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: TaskRepository) {}
    async execute(input: Input): Promise<Output> {
      const { title, projectId, createdById, assigneeId, slug } = input;
      if (!createdById || !title || !projectId || !assigneeId || !slug) {
        throw new BadRequestException('Dados inválidos');
      }
      const task = new TaskEntity(input);
      const result = await this.repository.create(task);
      return TaskResponse.Mapper.toResponse(result);
    }
  }
}
