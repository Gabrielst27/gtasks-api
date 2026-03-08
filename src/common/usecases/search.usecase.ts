import { Entity, EntityProps } from 'src/common/entities/entity';
import {
  SearchParams,
  SearchProps,
} from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import {
  AppQuery,
  AppQueryProps,
} from 'src/common/utils/app-queries/app-query';

export abstract class SearchUseCase<E extends Entity<EntityProps>, Response> {
  protected makeAppQueries(queries: AppQueryProps[]): AppQuery[] {
    const appQueries = queries.map((query) => new AppQuery(query));
    return appQueries;
  }

  protected makeSearchParams(searchProps: SearchProps): SearchParams {
    const params = new SearchParams(searchProps);
    return params;
  }

  protected abstract convertToResponse(
    entityResult: SearchResult<E>,
  ): SearchResult<Response>;
}
