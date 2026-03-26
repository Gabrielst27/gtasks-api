import { BadRequestException } from '@nestjs/common';
import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { SearchUseCase } from 'src/common/usecases/search.usecase';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { makeQueryProps } from 'src/common/utils/app-queries/make-query-props';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';
import { CollaboratorRepository } from 'src/domain/collaborators/repositories/collaborator.repository';
import { CollaboratorResponse } from 'src/modules/collaborators/dtos/responses/collaborator-response.dto';

export namespace SearchCollaborators {
  export type Input = { projectId: string; searchProps: SearchProps };
  export type Output = SearchResult<CollaboratorResponse.Dto>;

  export class UseCase
    extends SearchUseCase<CollaboratorEntity, CollaboratorResponse.Dto>
    implements IUseCase<Input, Output>
  {
    constructor(private readonly repository: CollaboratorRepository) {
      super();
    }
    async execute(input: Input): Promise<Output> {
      const { projectId, searchProps } = input;
      if (!projectId) {
        throw new BadRequestException('Busca inválida');
      }

      const querieProps = [makeQueryProps('projectId', projectId)];
      const searchFields = querieProps.map((query) => query.field);
      this.repository.validateSearchFields(searchFields);
      const query = super.makeAppQueries(querieProps);

      const sortField = searchProps.sort;
      if (sortField) {
        this.repository.validateSortField(sortField);
      }
      const params = super.makeSearchParams(searchProps);

      const result = await this.repository.findMany(params, query);
      return this.convertToResponse(result);
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
}
