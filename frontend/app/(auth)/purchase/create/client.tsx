"use client";
import { SelectSupplier } from "@/components/select-supplier";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Supplier } from "@/types/company";
import { PaginatorResponse } from "@/types/paginator-response";
import { Table } from "lucide-react";
import { useState } from "react";
import { SelectProduct } from "@/components/select-product";
import { Input } from "@/components/ui/input";

type Details = {
  product_id: number;
  quantity: number;
  price: number;
  note: string;
};

const initialDetails = {
  product_id: 0,
  quantity: 1,
  price: 0,
  note: "",
}

export function PurchaseClient({
  suppliers,
}: {
  suppliers: PaginatorResponse<Supplier>;
}) {
  const [supplier_id, setSupplier] = useState<number | null>(null);
  const [details, setDetails] = useState<Details[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogDetail, setDialogDetail] = useState<Details>(initialDetails);

  const selectedSupplier = suppliers.data.find(s => s.id === supplier_id);
  return (
    <>
      <SelectSupplier
        suppliers={suppliers.data}
        onValueChange={(id) => setSupplier(Number.parseInt(id))}
      />
      <Dialog open={isDialogOpen} onOpenChange={(o) => setDialogOpen(o)}>
        <DialogTrigger asChild>
          <Button
            title="仕入商品追加"
            type="button"
            variant="default"
            size="default"
          >
            商品選択
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-[800px]">
          <DialogDescription hidden>
            発注する商品を選択してください。
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>商品選択</DialogTitle>
          </DialogHeader>
          <SelectProduct products={selectedSupplier?.supply_products ?? []} onValueChange={v => setDialogDetail({
            ...dialogDetail,
            product_id: Number.parseInt(v),
          })} />
          <Input type="text" pattern="[0-9]*[0-9]" value={dialogDetail.quantity} onChange={e => setDialogDetail({
            ...dialogDetail,
            quantity: Number.parseInt(e.target.value),
          })} />
          <Input type="text" value={dialogDetail.price} onChange={e => setDialogDetail({
            ...dialogDetail,
            price: Number.parseInt(e.target.value),
          })} />
          <Input type="text" value={dialogDetail.note} onChange={e => setDialogDetail({
            ...dialogDetail,
            note: e.target.value,
          })} />

          <DialogFooter>
            <Button
              title="追加"
              type="button"
              variant="default"
              size="default"
              onClick={() => {
                setDetails([...details, { product_id: 1, quantity: 1, price: 1, note: "" }]);
              }}
            >
              追加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {
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
            {details.map((detail, index) => (
              <TableRow key={index}>
                <TableCell>{detail.product_id}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>{detail.price}</TableCell>
                <TableCell>{detail.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </>
  );
}
