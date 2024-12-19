import { getSuppliers } from "@/actions/company";
import { PurchaseClient } from "./client";

export default async function Page() {
  const suppliers = await getSuppliers();

  return (
    <PurchaseClient suppliers={suppliers} />
  )
}