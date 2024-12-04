import { getProducts } from "@/actions/products";
import { getProductCategories } from "@/actions/category";
import { ProductListContent } from "./content";
import { getManufacturers } from "@/actions/manufacturer";

export default async function ProductListPage({searchParams} : {
  searchParams:  Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { page = '1' } = await searchParams;

  const products = Array.isArray(page) ? await getProducts(page[0]) : await getProducts(page);
  const categories = await getProductCategories();
  const manufacturers = await getManufacturers();

  return (
    <div className="md:p-4 md:grid md:grid-cols-3">
      <ProductListContent products={products} categories={categories} manucaturers={manufacturers} />
    </div>
  );
}
