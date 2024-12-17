import { getPurchaseOrder } from "@/actions/purchase-order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const purchaseOrder = await getPurchaseOrder(id);
  
  return (
    <div>
      <h1>Purchase Order Detail</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Note</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          
            {purchaseOrder.details.map((detail) => (
              <TableRow key={detail.id}>
                <TableCell>{detail.product?.name}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>{detail.price}</TableCell>
                <TableCell>{detail.note}</TableCell>
              </TableRow>
            ))}
          
        </TableBody>
      </Table>
    </div>
  );
}
