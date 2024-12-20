import * as v from "valibot";

export const PaginatorLinksSchema = v.object({
  first: v.nullable(v.pipe(v.string(), v.url())),
  last: v.nullable(v.pipe(v.string(), v.url())),
  prev: v.nullable(v.pipe(v.string(), v.url())),
  next: v.nullable(v.pipe(v.string(), v.url())),
});

export type PaginatorLinks = v.InferInput<typeof PaginatorLinksSchema>;

export const PaginatorMetaSchema = v.object({
  current_page: v.number(),
  from: v.nullable(v.number()),
  last_page: v.number(),
  links: v.array(
    v.object({
      url: v.nullable(v.string()),
      label: v.string(),
      active: v.boolean(),
    })
  ),
  path: v.pipe(v.string(), v.url()),
  per_page: v.number(),
  to: v.nullable(v.number()),
  total: v.number(),
});

export type PaginatorMeta = v.InferInput<typeof PaginatorMetaSchema>;

export type LengthAwarePaginator<T> = { data: T[] } & PaginatorMeta &
  PaginatorLinks;

export type PaginatorResourceResponse<T> = {
  data: T[];
  meta: PaginatorMeta;
  links: PaginatorLinks;
};
