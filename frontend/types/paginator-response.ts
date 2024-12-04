export type PaginatorResponse<T> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type SimplePaginatorResponse<T> = {
  current_page: number;
  data: T[];
  first_page_url: string | null;
  from: number | null;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
};

export type CursorPaginatorResponse<T> = {
  data: T[];
  path: string;
  next_cursor: string | null;
  next_page_url: string | null;
  prev_cursor: string | null;
  prev_page_url: string | null;
};

