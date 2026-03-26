import { Entity, EntityProps } from 'src/common/entities/entity';

type SearchResultProps<Item> = {
  items: Item[];
  total: number;
  page: number;
  perPage: number;
  sort: string;
  sortDir: 'asc' | 'desc';
};

export class SearchResult<Item extends Entity<EntityProps> | any> {
  readonly items: Item[];
  readonly total: number;
  readonly page: number;
  readonly perPage: number;
  readonly lastPage: number;
  readonly sort: string;
  readonly sortDir: 'asc' | 'desc';

  constructor(props: SearchResultProps<Item>) {
    //TODO: Create search result validation
    this.items = props.items;
    this.total = props.total;
    this.page = props.page;
    this.perPage = props.perPage;
    this.sort = props.sort;
    this.sortDir = props.sortDir;
    //TODO: fix lastPage
    this.lastPage = Math.floor(props.total / props.perPage);
  }
}
