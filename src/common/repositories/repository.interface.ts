import { Entity, EntityProps } from 'src/common/entities/entity';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';

export interface IRepository<Item extends Entity<EntityProps>> {
  findById(id: string): Promise<Item>;
  findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<Item>>;
  create(item: Item): Promise<Item>;
  update(id: string, item: Item): Promise<Item>;
  delete(id: string): Promise<Item>;
}
