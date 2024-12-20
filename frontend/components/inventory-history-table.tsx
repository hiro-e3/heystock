import { InventoryResponse } from "@/types/inventory";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

export function InventoryHistoryTable({
  inventories
}: {
  inventories: InventoryResponse[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>商品</TableHead>
          <TableHead>倉庫</TableHead>
          <TableHead>数量</TableHead>
          <TableHead>原価</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventories.map((inventory) => (
          <TableRow key={inventory.id}>
            <TableCell>{inventory.product.name}</TableCell>
            <TableCell>{inventory.warehouse.name}</TableCell>
            <TableCell>{inventory.quantity}</TableCell>
            <TableCell>{inventory.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}