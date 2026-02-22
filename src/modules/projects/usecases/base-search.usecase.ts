import { SearchResult } from 'src/common/repositories/search-result';
import { SearchUseCase } from 'src/common/usecases/search.usecase';
import { ProjectEntity } from 'src/domain/projects/entities/project.entity';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';

export abstract class BaseSearchProjectUseCase extends SearchUseCase<
  ProjectEntity,
  ProjectResponse.Dto
> {
  protected get searchableFields(): string[] {
    return [...super.searchableFields, 'name'];
  }

  protected get sortableFields(): string[] {
    return [...super.searchableFields, 'name'];
  }

  protected convertToResponse(
    entityResult: SearchResult<ProjectEntity>,
  ): SearchResult<ProjectResponse.Dto> {
    const responses = entityResult.items.map((item) =>
      ProjectResponse.Mapper.toResponse(item),
    );
    return {
      ...entityResult,
      items: responses,
    };
  }
}
