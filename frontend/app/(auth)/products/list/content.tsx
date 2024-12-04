"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/product-categories";
import { useState } from "react";
import { ProductCategorySelect } from "@/components/ProductCategorySelect";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { numberFormatter, range } from "@/lib/utils";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/actions/products";
import { PaginatorResponse } from "@/types/paginator-response";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus } from "lucide-react";
import { createProductCategory } from "@/actions/category";
import { ManufacturerSelect } from "@/components/ManufacturerSelect";
import { Manufacturer } from "@/types/manufacturer";
import { createManufacturer } from "@/actions/manufacturer";

type NewProduct = Omit<Product, "id" | "created_at" | "updated_at"> &
  Partial<{ id: number }>;

export function ProductListContent({
  products,
  categories,
  manucaturers,
}: {
  products: PaginatorResponse<Product>;
  categories: ProductCategory[];
  manucaturers: Manufacturer[];
}) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<NewProduct>({
    id: undefined,
    name: "",
    unit_price: "",
    description: "",
    category_id: undefined,
  });

  // カテゴリ追加用
  const [category, setCategory] = useState<
    Omit<ProductCategory, "id" | "description"> & { description: string }
  >({
    name: "",
    description: "",
  });

  const [manufacturer, setManufacturer] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    contact_person: "",
  });

  const start = products.current_page - 2 > 1 ? products.current_page - 2 : 1;
  const end =
    products.current_page + 2 < products.last_page
      ? products.current_page + 2
      : products.last_page;
  const pages = [...range(start, end + 1)];

  return (
    <div className="flex flex-col col-span-2">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="self-end mb-2">
        {/* 商品追加・編集ダイアログ */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                setProduct({
                  id: undefined,
                  name: "",
                  unit_price: "",
                  description: "",
                  category_id: undefined,
                })
              }
            >
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogDescription hidden>
              商品の追加・編集を行います。
            </DialogDescription>
            <DialogHeader>
              <DialogTitle>商品{product.id ? "編集" : "追加"}</DialogTitle>
            </DialogHeader>
            <form
              id="create-product-form"
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.id !== undefined) {
                  const newProduct = {
                    id: product.id,
                    ...product,
                  };
                  await updateProduct(newProduct);
                } else {
                  await createProduct(product);
                }
                setOpen(false);
              }}
            >
              <div>
                <Label htmlFor="name">商品名</Label>
                <Input
                  id="name"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="manufacturer">メーカー</Label>
                <div className="flex flex-row gap-2">
                  <ManufacturerSelect
                    manucaturers={manucaturers}
                    value={product.manufacturer?.id.toString()}
                    onValueChange={(id) => {
                      setProduct({
                        ...product,
                        manufacturer_id: Number.parseInt(id),
                      });
                    }}
                  />
                  {/* カテゴリ追加用ポップオーバー */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="secondary" size="icon">
                        <Plus />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96">
                      <form
                        id="create-new-manufacturer"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          const newManufacturer = await createManufacturer(
                            manufacturer
                          );

                          if (newManufacturer) {
                            // clear form
                            setManufacturer({
                              name: "",
                              address: "",
                              phone: "",
                              email: "",
                              contact_person: "",
                              description: "",
                            });
                          }
                        }}
                      >
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                              メーカー追加
                            </h4>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="new-manufacturer-name">
                                Name
                              </Label>
                              <Input
                                id="new-manufacturer-name"
                                value={manufacturer.name}
                                className="col-span-2 h-8"
                                onChange={(e) =>
                                  setManufacturer({
                                    ...manufacturer,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="new-manufacturer-address">
                                Address
                              </Label>
                              <Input
                                id="new-manufacturer-address"
                                value={manufacturer.address}
                                className="col-span-2 h-8"
                                onChange={(e) =>
                                  setManufacturer({
                                    ...manufacturer,
                                    address: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="new-manufacturer-phone">
                                Phone
                              </Label>
                              <Input
                                id="new-manufacturer-phone"
                                value={manufacturer.phone}
                                className="col-span-2 h-8"
                                onChange={(e) =>
                                  setManufacturer({
                                    ...manufacturer,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="new-manufacturer-email">
                                E-mail
                              </Label>
                              <Input
                                type="email"
                                id="new-manufacturer-email"
                                value={manufacturer.email}
                                className="col-span-2 h-8"
                                onChange={(e) =>
                                  setManufacturer({
                                    ...manufacturer,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="new-manufacturer-contact-person">
                                Contact Person
                              </Label>
                              <Input
                                id="new-manufacturer-contact-person"
                                value={manufacturer.contact_person}
                                className="col-span-2 h-8"
                                onChange={(e) =>
                                  setManufacturer({
                                    ...manufacturer,
                                    contact_person: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="new-manufacturer-description">
                                Description
                              </Label>
                              <Input
                                id="new-manufacturer-description"
                                value={manufacturer.description}
                                className="col-span-2 h-8"
                                onChange={(e) =>
                                  setManufacturer({
                                    ...manufacturer,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="flex flex-row justify-end">
                              <Button
                                type="submit"
                                form="create-new-manufacturer"
                              >
                                追加
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div>
                <Label htmlFor="unit_price">定価</Label>
                <Input
                  id="unit_price"
                  value={product.unit_price}
                  onChange={(e) =>
                    setProduct({ ...product, unit_price: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">説明</Label>
                <Input
                  id="description"
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="category">カテゴリ</Label>
                <div className="flex flex-row gap-2">
                  <ProductCategorySelect
                    categories={categories}
                    onValueChange={(v) =>
                      setProduct({
                        ...product,
                        category_id: Number.parseInt(v),
                      })
                    }
                    value={product.category_id?.toString()}
                  />
                  {/* カテゴリ追加用ポップオーバー */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="secondary" size="icon">
                        <Plus />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <form
                        id="create-new-category"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const newCategory = await createProductCategory(
                            category
                          );
                          if (newCategory) {
                            // clear form
                            setCategory({
                              name: "",
                              description: "",
                            });
                          }
                        }}
                      >
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                              カテゴリ追加
                            </h4>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="new-category-name">Name</Label>
                              <Input
                                id="new-category-name"
                                value={category.name}
                                className="col-span-2 h-8"
                                onChange={(e) =>
                                  setCategory({
                                    ...category,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="new-category-description">
                                Description
                              </Label>
                              <Input
                                id="new-category-description"
                                value={category.description}
                                className="col-span-2 h-8"
                                onChange={(e) =>
                                  setCategory({
                                    ...category,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="flex flex-row justify-end">
                              <Button type="submit" form="create-new-category">
                                追加
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </form>
            <DialogFooter>
              <Button type="submit" form="create-product-form">
                {product.id !== undefined ? "更新" : "作成"}
              </Button>
              {product.id !== undefined && (
                <Button
                  type="button"
                  onClick={async () => {
                    await deleteProduct(product.id!);
                    setOpen(false);
                  }}
                  variant="destructive"
                >
                  削除
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* 商品一覧 */}
      <div className="p-2 border rounded dark:border-slate-500">
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
                  setProduct(p);
                  setOpen(true);
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
        {/* ページネーション */}
        {/* TODO:LaravelおよびNext.js側でのデータ受け渡し実装の見直し */}
        <Pagination>
          <PaginationContent>
            {products.current_page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${products.current_page - 1}`}
                  prefetch
                />
              </PaginationItem>
            )}
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`?page=${page}`}
                  isActive={page === products.current_page}
                  prefetch
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
                  prefetch
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
