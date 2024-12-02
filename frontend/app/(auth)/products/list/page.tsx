import { getProducts } from "@/actions/products";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const numberFormatter = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });


export default async function ProductPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-2 min-w-full">
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <Table className="mt-3">
          <TableHeader className="">
            <TableRow>
              <TableHead>メーカー</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>種類</TableHead>
              <TableHead>定価</TableHead>
              <TableHead>説明</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {products.data.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.manufacturer_id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category_id}</TableCell>
                <TableCell>{numberFormatter.format(Number.parseFloat(product.unit_price))}</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-white">details</h3>
      </div>
    </div>
  )
}