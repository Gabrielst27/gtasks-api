import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { ProjectRepository } from 'src/domain/projects/repositories/projects.repository';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';

export namespace FindProjectByIdUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ProjectResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: ProjectRepository) {}

    async execute(input: Input): Promise<ProjectResponse.Dto> {
      if (!input.id) {
        throw new BadRequestException('Requisição inválida');
      }
      const result = await this.repository.findById(input.id);
      return ProjectResponse.Mapper.toResponse(result);
    }
  }
}
