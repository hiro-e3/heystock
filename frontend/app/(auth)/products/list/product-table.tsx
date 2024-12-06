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
} from "@/components/ui/pagination";
import { numberFormatter, range } from "@/lib/utils";
import { PaginatorResponse } from "@/types/paginator-response";
import { Product } from "@/types/product";
import {
  ProductDialogDispatchContext,
  ProductDispatchContext,
} from "../ProductContext";
import { useContext } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export function ProductTable({
  products,
}: {
  products: PaginatorResponse<Product>;
}) {
  const productDispatch = useContext(ProductDispatchContext);
  const dialogDispatch = useContext(ProductDialogDispatchContext);
  if (productDispatch === null || dialogDispatch === null) {
    throw new Error("ProductDispatchContext is null");
  }

  const start =
    products.current_page < 3
      ? 1
      : products.last_page - products.current_page < 2
      ? products.last_page - 4
      : products.current_page - 2;

  const end =
    products.current_page < 3
      ? 5
      : products.last_page - products.current_page < 2
      ? products.last_page
      : products.current_page + 2;
  const pages = [...range(start, end + 1)];
  return (
    <>
      <div className="h-[590px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-36">メーカー</TableHead>
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
      </div>

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
                isActive={page === products.current_page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink href={`?page=${products.last_page}`}>
              <ChevronsRight size={16} />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
