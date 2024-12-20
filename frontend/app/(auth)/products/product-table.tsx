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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { numberFormatter } from "@/lib/utils";
import { PaginatorResourceResponse } from "@/types/paginator-response";
import { Product, ProductResponse } from "@/types/product";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProduct, updateProduct } from "@/actions/products";
import { Company } from "@/types/company";
import { ProductCategory } from "@/types/product-categories";
import { useState } from "react";
import { ProductForm } from "@/components/product-form";
import { InventoryCreateDialog } from "./inventory-dialog";
import { TablePaginator } from "@/components/table-paginator";
import { useToast } from "@/hooks/use-toast";

export function ProductTable({
  products,
  manufacturers,
  categories,
}: {
  products: PaginatorResourceResponse<ProductResponse>;
  manufacturers: Company[];
  categories: ProductCategory[];
}) {
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
              <TableHead>在庫数</TableHead>
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
                <TableCell>{p.total_inventory}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell className="flex gap-2">
                  <EditProductDialog
                    defaultProduct={{
                      id: p.id,
                      name: p.name,
                      description: p.description ?? "",
                      unit_price: p.unit_price,
                      manufacturer_id: p.manufacturer?.id,
                      category_id: p.category?.id,
                    }}
                    manucaturers={manufacturers}
                    categories={categories}
                  />
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
                  <InventoryCreateDialog product={p} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePaginator
        currentPage={products.meta.current_page}
        lastPage={products.meta.last_page}
      />
    </>
  );
}

function EditProductDialog({
  defaultProduct,
  categories,
  manucaturers,
}: {
  defaultProduct: Product & { id: number };
  categories: ProductCategory[];
  manucaturers: Company[];
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [product, setProduct] = useState(defaultProduct);
  const { toast } = useToast();
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={(o) => setDialogOpen(o)}>
        <DialogTrigger asChild>
          <Button title="編集" type="button" variant="outline" size="icon-sm">
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
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              const result = await updateProduct(product);
              if (result.success) {
                toast({
                  description: `${product.name} id:${product.id} を更新しました`,
                });
                setDialogOpen(false);
              } else {
                console.error(result.errors);
              }
            }}
          />
          <DialogFooter>
            <Button type="submit" form="create-product-form">
              更新
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
