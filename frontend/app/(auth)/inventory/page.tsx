import { getInventories } from "@/actions/inventory";
import { InventoryClient } from "./client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page = "1" } = await searchParams;
  const inventories = await getInventories(page);

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">在庫履歴一覧</h1>
        <InventoryClient inventories={inventories} />
      </div>
    </div>
  );
}
