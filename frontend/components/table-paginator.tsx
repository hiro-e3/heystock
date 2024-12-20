import { ChevronsLeft, ChevronsRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";
import { calcPagination } from "@/lib/utils";

export function TablePaginator({
  currentPage,
  lastPage,
  perPage,
}: {
  currentPage: number;
  lastPage: number;
  perPage?: number;
}) {
  const pages = calcPagination(currentPage, lastPage, perPage);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href={`?page=1`}>
            <ChevronsLeft size={16} />
          </PaginationLink>
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink href={`?page=${lastPage}`}>
            <ChevronsRight size={16} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
