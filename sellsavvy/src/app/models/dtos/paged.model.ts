export interface PagedMetaData {
  pageNumber: number;
  pageCount: number;
  pageSize: number;
  totalCount: number;
  firstItemOnPage: number;
  lastItemOnPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  sort: string;
  order: string;
  filters: string;
}

export interface PagedData<T> {
  metadata: PagedMetaData;
  items: T[];
}
