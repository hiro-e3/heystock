"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginatorResponse } from "@/types/paginator-response";
import { PurchaseOrder } from "@/types/purchase-order";
import Link from "next/link";

export function PurchaseTable({
  purchaseOrders,
}: {
  purchaseOrders: PaginatorResponse<PurchaseOrder>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>注文日</TableHead>
          <TableHead>配達日</TableHead>
          <TableHead>メモ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchaseOrders.data.map((purchaseOrder) => (
          <TableRow key={purchaseOrder.id}>
            <TableCell>{purchaseOrder.order_date}</TableCell>
            <TableCell>{purchaseOrder.delivery_date}</TableCell>
            <TableCell>{purchaseOrder.note}</TableCell>
            <TableCell><Link href={`/purchase/${purchaseOrder.id}`} className="hover:underline">詳細</Link></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
