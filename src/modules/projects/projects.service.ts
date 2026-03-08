import { Injectable } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/project-request.dto';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';
import { CreateProjectUseCase } from 'src/modules/projects/usecases/create.usecase';
import { FindProjectByIdUseCase } from 'src/modules/projects/usecases/find-by-id.usecase';
import { UpdateProjectUseCase } from 'src/modules/projects/usecases/update.usecase';
import { FindAllProjectsUseCase } from 'src/modules/projects/usecases/find-all.usecase';
import { SearchResult } from 'src/common/repositories/search-result';
import { FindProjectBySlugUseCase } from 'src/modules/projects/usecases/find-by-slug.usecase';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { ProjectRepository } from 'src/domain/projects/repositories/projects.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private repository: ProjectRepository,
    private readonly authService: AuthService,
  ) {}

  async findAll(
    searchParams: SearchManyRequestDto,
  ): Promise<SearchResult<ProjectResponse.Dto>> {
    const usecase = new FindAllProjectsUseCase.UseCase(this.repository);
    return await usecase.execute(searchParams);
  }

  async findById(id: string) {
    const usecase = new FindProjectByIdUseCase.UseCase(this.repository);
    return await usecase.execute({ id });
  }

  async findBySlug(slug: string) {
    const usecase = new FindProjectBySlugUseCase.UseCase(this.repository);
    return await usecase.execute({ slug });
  }

  async create(authUser: AuthenticatedUserDto, data: ProjectRequestDto) {
    this.authService.verifyAdminToken(authUser);
    const usecase = new CreateProjectUseCase.UseCase(this.repository);
    return await usecase.execute({ ...data, createdById: authUser.id });
  }

  async update(
    id: string,
    data: ProjectRequestDto,
    authUser: AuthenticatedUserDto,
  ) {
    this.authService.verifyAdminToken(authUser);
    const usecase = new UpdateProjectUseCase.UseCase(this.repository);
    return await usecase.execute({ ...data, id });
  }

  delete(id: string) {}
}
