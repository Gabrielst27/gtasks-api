import { SearchResult } from 'src/common/repositories/search-result';
import { SearchUseCase } from 'src/common/usecases/search.usecase';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';
import { CollaboratorResponse } from 'src/modules/collaborators/dtos/responses/collaborator-response.dto';

export abstract class BaseSearchCollaboratorUseCase extends SearchUseCase<
  CollaboratorEntity,
  CollaboratorResponse.Dto
> {
  protected get searchableFields(): string[] {
    return [...super.searchableFields, 'projectId', 'userId'];
  }

  protected get sortableFields(): string[] {
    return [...super.searchableFields, 'name'];
  }

  protected convertToResponse(
    entityResult: SearchResult<CollaboratorEntity>,
  ): SearchResult<CollaboratorResponse.Dto> {
    const responses = entityResult.items.map((item) =>
      CollaboratorResponse.Mapper.toResponse(item),
    );
    return {
      ...entityResult,
      items: responses,
    };
  }
}
