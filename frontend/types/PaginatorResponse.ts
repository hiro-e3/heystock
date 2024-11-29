export type PaginatorResponse<T> = {
  currentPage: number;
  data: T[];
  firstPageUrl: string;
  from: number | null;
  lastPage: number;
  lastPageUrl: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  nextPageUrl: string | null;
  path: string;
  perPage: number;
  to: number | null;
  total: number;
};

export type SimplePaginatorResponse<T> = {
  currentPage: number;
  data: T[];
  firstItem: number | null;
  lastItem: number | null;
  nextPageUrl: string | null;
  perPage: number;
  prevPageUrl: string | null;
  to: number | null;
  total: number;
};

export type CursorPaginatorResponse<T> = {
  data: T[];
  nextCursor: string | null;
  prevCursor: string | null;
};

