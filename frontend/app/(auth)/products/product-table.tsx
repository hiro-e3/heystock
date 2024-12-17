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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { calcPagination, numberFormatter } from "@/lib/utils";
import { PaginatorResponse } from "@/types/paginator-response";
import { Product } from "@/types/product";
import { ChevronsLeft, ChevronsRight, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/actions/products";
import { Company } from "@/types/company";
import { ProductCategory } from "@/types/product-categories";
import { useState } from "react";
import { ProductForm } from "@/components/product-form";

export function ProductTable({
  products,
  manufacturers,
  categories,
}: {
  products: PaginatorResponse<
    Product
  >;
  manufacturers: Company[];
  categories: ProductCategory[];
}) {
  const pages = calcPagination(products.current_page, products.last_page);
  return (
    <>
      <div className="h-[700px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-36">メーカー</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>種類</TableHead>
              <TableHead>定価</TableHead>
              <TableHead>説明</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.manufacturer?.name}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.category?.name}</TableCell>
                <TableCell>
                  {numberFormatter.format(Number.parseFloat(p.unit_price))}
                </TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell className="flex gap-2">
                  <EditProductDialog defaultProduct={p} manucaturers={manufacturers} categories={categories} />
                  <Button
                    title="削除"
                    type="button"
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => {
                      deleteProduct(p.id!);
                    }}
                  >
                    <span>
                      <Trash2 />
                    </span>
                  </Button>
                </TableCell>
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

function EditProductDialog({
  defaultProduct,
  categories,
  manucaturers,
}: {
  defaultProduct: Product;
  categories: ProductCategory[];
  manucaturers: Company[];
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [product, setProduct] = useState(defaultProduct);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={(o) => setDialogOpen(o)}>
        <DialogTrigger asChild>
          <Button
            title="編集"
            type="button"
            variant="outline"
            size="icon-sm"
          >
            <span>
              <Edit />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
          <DialogDescription hidden>商品の編集を行います。</DialogDescription>
          <DialogHeader>
            <DialogTitle>商品{product?.id ? "編集" : "追加"}</DialogTitle>
          </DialogHeader>
          <ProductForm
            id="create-product-form"
            product={product}
            categories={categories}
            manucaturers={manucaturers}
            onChange={setProduct}
          />
          <DialogFooter>
            <Button type="submit" form="create-product-form">
              作成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
