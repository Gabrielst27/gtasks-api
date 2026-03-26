import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TaskRequestDto } from 'src/modules/tasks/dtos/requests/task-request.dto';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { TaskRepository } from 'src/domain/tasks/repositories/task-repository';

export namespace UpdateTaskUseCase {
  export type Input = TaskRequestDto & { id: string };

  export type Output = TaskResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: TaskRepository) {}

    async execute(input: Input): Promise<Output> {
      const { id, ...props } = input;
      if (!id || !props.title) {
        throw new BadRequestException('Dados inválidos');
      }
      const task = await this.repository.findById(id);
      task.updateProps(props);
      const result = await this.repository.update(id, task);
      return TaskResponse.Mapper.toResponse(result);
    }
  }
}
