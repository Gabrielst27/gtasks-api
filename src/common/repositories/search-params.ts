export type SearchProps = {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
};

export class SearchParams {
  readonly page: number;
  readonly perPage: number;
  readonly sort: string;
  readonly sortDir: 'asc' | 'desc';

  constructor(props: SearchProps) {
    //TODO: Create search params validation
    this.page = props.page && props.page >= 0 ? props.page : 0;
    this.perPage = SearchParams.verifyPerPage(props.perPage);
    this.sort = props.sort || 'createdAt';
    this.sortDir = props.sortDir || 'desc';
  }

  static verifyPerPage(perPage: number | undefined): number {
    if (!perPage) return 15;
    if (perPage < 1) return 1;
    if (perPage > 50) return 50;
    return perPage;
  }
}
