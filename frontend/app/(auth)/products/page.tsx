import { getProducts } from "@/actions/products";
import { ProductPageClient } from "./client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page = "1" } = await searchParams;
  const product = await getProducts(page);

  return (
    <ProductPageClient products={product} />
  );
}
