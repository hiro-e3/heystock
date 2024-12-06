import { ReactNode } from "react";
import { ProductProvider } from "../ProductContext";
import { getProductCategories } from "@/actions/category";
import { getManufacturers } from "@/actions/manufacturer";
import { ProductDialog } from "../product-dialog";

export default async function ProductLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, manufacturers] = await Promise.all([
    getProductCategories(),
    getManufacturers(),
  ]);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">商品管理</h1>
      <div className="flex flex-col mt-5">
        <ProductProvider>
          <div className="flex justify-end mb-3">
            <ProductDialog
              categories={categories}
              manucaturers={manufacturers}
            />
          </div>
          {children}
        </ProductProvider>
      </div>
    </div>
  );
}