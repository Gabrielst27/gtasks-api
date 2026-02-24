import { BadRequestException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { IProjectRepository } from 'src/domain/projects/repositories/projects.repository';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';

export namespace FindProjectBySlugUseCase {
  export type Input = { slug: string };
  export type Output = ProjectResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private repository: IProjectRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.slug) {
        throw new BadRequestException('Busca inválida');
      }
      const project = await this.repository.findBySlug(input.slug);
      return ProjectResponse.Mapper.toResponse(project);
    }
  }
}
