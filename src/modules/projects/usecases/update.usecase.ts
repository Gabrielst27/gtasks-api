import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { ProjectRepository } from 'src/domain/projects/repositories/projects.repository';
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/project-request.dto';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';

export namespace UpdateProjectUseCase {
  export type Input = ProjectRequestDto & { id: string };

  export type Output = ProjectResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: ProjectRepository) {}

    async execute(input: Input): Promise<ProjectResponse.Dto> {
      const { id, name, description } = input;
      if (!id) {
        throw new BadRequestException('Impossível buscar o dado');
      }
      if (!name && !description) {
        throw new BadRequestException('Requisição inválida');
      }
      const project = await this.repository.findById(id);
      const entity = project.updateProps({ name, description });
      const result = await this.repository.update(id, entity);
      return ProjectResponse.Mapper.toResponse(result);
    }
  }
}
