import { getPurchaseOrders } from "@/actions/purchase-order";
import { PurchaseTable } from "@/components/purchase-table";

export default async function PurchaseOrdersPage() {
  const purchaseOrders = await getPurchaseOrders();
  
  return (
    <div>
      <h1>Purchase Orders</h1>
      <PurchaseTable purchaseOrders={purchaseOrders} />
    </div>
  );
}