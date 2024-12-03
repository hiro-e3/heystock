import { getProducts } from "@/actions/products";
import { getProductCategories } from "@/actions/category";
import { ProductListContent } from "./content";

export default async function ProductListPage() {
  const products = await getProducts();
  const categories = await getProductCategories();

  return (
    <div className="md:p-4 md:grid md:grid-cols-3">
      <ProductListContent products={products.data} categories={categories} />
    </div>
  );
}
