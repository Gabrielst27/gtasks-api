import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { TaskRepository } from 'src/domain/tasks/repositories/task-repository';

export namespace FindTaskByIdUseCase {
  export type Input = {
    id: string;
  };

  export type Output = TaskResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: TaskRepository) {}
    async execute(input: Input): Promise<TaskResponse.Dto> {
      if (!input.id) {
        throw new BadRequestException('Busca inválida');
      }
      const result = await this.repository.findById(input.id);
      return TaskResponse.Mapper.toResponse(result);
    }
  }
}
