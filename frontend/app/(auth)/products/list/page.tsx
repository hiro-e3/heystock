import { getProducts } from "@/actions/products";
import { ProductTable } from "./product-table";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string  | undefined }>;
}) {
  const { page = "1" } = await searchParams;
  const product = await getProducts(page);
  return (
    <div className="border rounded p-3">
      <ProductTable products={product} />
    </div>
  );
}