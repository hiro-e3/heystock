"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { numberFormatter, range } from "@/lib/utils";
import { PaginatorResponse } from "@/types/paginator-response";
import { Product } from "@/types/product";
import { ProductDialogDispatchContext, ProductDispatchContext } from "../ProductContext";
import { useContext } from "react";

export function ProductTable({
  products,
}: {
  products: PaginatorResponse<Product>;
}) {
  const productDispatch = useContext(ProductDispatchContext);
  const dialogDispatch = useContext(ProductDialogDispatchContext);
  if(productDispatch === null || dialogDispatch === null) {
    throw new Error("ProductDispatchContext is null");
  }

  const start = products.current_page - 2 > 1 ? products.current_page - 2 : 1;
  const end =
    products.current_page + 2 < products.last_page
      ? products.current_page + 2
      : products.last_page;
  const pages = [...range(start, end + 1)];
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>メーカー</TableHead>
            <TableHead>名前</TableHead>
            <TableHead>種類</TableHead>
            <TableHead>定価</TableHead>
            <TableHead>説明</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((p) => (
            <TableRow
              key={p.id}
              className="cursor-pointer"
              onClick={() => {
                productDispatch({ type: "set", product: p });
                dialogDispatch("open");
              }}
            >
              <TableCell>{p.manufacturer?.name}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category?.name}</TableCell>
              <TableCell>
                {numberFormatter.format(Number.parseFloat(p.unit_price))}
              </TableCell>
              <TableCell>{p.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          {products.current_page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${products.current_page - 1}`}
                
              />
            </PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}`}
                isActive={page === products.current_page}
                
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {products.last_page !== products.current_page && (
            <PaginationItem>
              <PaginationNext
                href={`?page=${
                  products.last_page > products.current_page + 5
                    ? products.current_page + 5
                    : products.last_page
                }`}
                
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
