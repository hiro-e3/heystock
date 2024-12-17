'use client';

import { Company } from "@/types/company";
import { ProductCategory } from "@/types/product-categories";
import { createContext, useContext } from "react";

const ProductCategoriesContext = createContext<ProductCategory[] | null>(null);
const ManufacturersContext = createContext<Company[] | null>(null);


export function ProductDataProvider(
  { categories, manufacturers, children }:
  { categories: ProductCategory[]; manufacturers: Company[]; children: React.ReactNode }
) {
  return (
    <ProductCategoriesContext.Provider value={categories}>
      <ManufacturersContext.Provider value={manufacturers}>
        {children}
      </ManufacturersContext.Provider>
    </ProductCategoriesContext.Provider>
  );
}

export function useProductCategories() {
  const categories = useContext(ProductCategoriesContext);
  if (categories === null) {
    throw new Error("useProductCategories must be used within a ProductDataProvider");
  }
  return categories;
}

export function useManufacturers() {
  const manufacturers = useContext(ManufacturersContext);
  if (manufacturers === null) {
    throw new Error("useManufacturers must be used within a ProductDataProvider");
  }
  return manufacturers;
}