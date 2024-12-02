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
  firstPageUrl: string | null;
  from: number | null;
  nextPageUrl: string | null;
  perPage: number;
  prevPageUrl: string | null;
  to: number | null;
};

export type CursorPaginatorResponse<T> = {
  data: T[];
  path: string;
  nextCursor: string | null;
  nextPageUrl: string | null;
  prevCursor: string | null;
  prevPageUrl: string | null;
};

