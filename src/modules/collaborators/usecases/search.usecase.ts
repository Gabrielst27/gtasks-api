import { BadRequestException } from '@nestjs/common';
import { SearchProps } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { makeQueryProps } from 'src/common/utils/app-queries/make-query-props';
import { ICollaboratorRepository } from 'src/domain/collaborators/repositories/collaborator.repository';
import { CollaboratorResponse } from 'src/modules/collaborators/dtos/responses/collaborator-response.dto';
import { BaseSearchCollaboratorUseCase } from 'src/modules/collaborators/usecases/base-search.usecase';

export namespace SearchCollaborators {
  export type Input = { projectId: string; searchProps: SearchProps };
  export type Output = SearchResult<CollaboratorResponse.Dto>;

  export class UseCase
    extends BaseSearchCollaboratorUseCase
    implements IUseCase<Input, Output>
  {
    constructor(private readonly repository: ICollaboratorRepository) {
      super();
    }
    async execute(input: Input): Promise<Output> {
      const { projectId, searchProps } = input;
      if (!projectId) {
        throw new BadRequestException('Busca inválida');
      }

      const querieProps = [makeQueryProps('projectId', projectId)];
      const searchFields = querieProps.map((query) => query.field);
      super.validateSearchFields(searchFields);
      const query = super.makeAppQueries(querieProps);

      const sortField = searchProps.sort;
      if (sortField) {
        super.validateSortField(sortField);
      }
      const params = super.makeSearchParams(searchProps);

      const result = await this.repository.findMany(params, query);
      return super.convertToResponse(result);
    }
  }
}
