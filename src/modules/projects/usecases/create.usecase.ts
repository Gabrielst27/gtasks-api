import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/project-request.dto';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';
import { ProjectEntity } from 'src/domain/projects/entities/project.entity';
import { ProjectRepository } from 'src/domain/projects/repositories/projects.repository';

export namespace CreateProjectUseCase {
  export type Input = ProjectRequestDto & { createdById: string };

  export type Output = ProjectResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: ProjectRepository) {}

    async execute(input: Input): Promise<ProjectResponse.Dto> {
      const { name, description, createdById } = input;
      if (!createdById) {
        throw new ForbiddenException('Usuário não autenticado');
      }
      if (!name) {
        throw new BadRequestException('Dados inválidos');
      }
      //TODO: Check if user exists
      const entity = new ProjectEntity(input);
      const result = await this.repository.create(entity);
      return ProjectResponse.Mapper.toResponse(result);
    }
  }
}
