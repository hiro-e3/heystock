import { getProducts } from "@/actions/products";
import { ProductPageClient } from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "heystock - 商品管理",
};


export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page = "1" } = await searchParams;
  const product = await getProducts(page);

  if(product.success) {
    return <ProductPageClient products={product.data} />;
  } else {
    return <div>商品情報の取得に失敗しました。</div>;
  }
}
