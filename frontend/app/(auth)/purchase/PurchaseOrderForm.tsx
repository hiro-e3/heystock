'use client'
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

type PurchaseOrder = {
  supplierId: string;
  orderDate: string;
  deliveryDate: string;
  note: string;
}

type PurchaseOrderDetail = {
  productId: string;
  quantity: string;
  price: string;
  note: string;
};

const PurchaseOrderForm = () => {
  const [supplierId, setSupplierId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [note, setNote] = useState('');
  const [details, setDetails] = useState<PurchaseOrderDetail[]>([
    { productId: '', quantity: '', price: '0', note: '' },
  ]);

  const handleAddDetail = () => {
    setDetails([...details, { productId: '', quantity: '', price: '', note: '' }]);
  };

  const handleDetailChange = (index: number, field: keyof PurchaseOrderDetail, value: string) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // フォームデータをサーバーに送信する処理
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* supplier_id の入力 */}
      <Input
        type="text"
        value={supplierId}
        onChange={(e) => setSupplierId(e.target.value)}
        placeholder="Supplier ID"
      />
      {/* order_date の入力 */}
      <Input
        type="date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
      />
      {/* delivery_date の入力 */}
      <Input
        type="date"
        value={deliveryDate}
        onChange={(e) => setDeliveryDate(e.target.value)}
      />
      {/* note の入力 */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note"
      />
      {/* 発注詳細の入力 */}
      {details.map((detail, index) => (
        <div key={index}>
          {/* product_id の入力 */}
          <Input
            type="text"
            value={detail.productId}
            onChange={(e) => handleDetailChange(index, 'productId', e.target.value)}
            placeholder="Product ID"
          />
          {/* quantity の入力 */}
          <Input
            type="text"
            value={detail.quantity}
            onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
            placeholder="Quantity"
          />
          {/* price の入力 */}
          <Input
            pattern='[0-9]*'
            type="text"
            value={detail.price}
            onChange={(e) => handleDetailChange(index, 'price', e.target.value)}
            placeholder="Price"
          />
          {/* note の入力 */}
          <Input
            type="text"
            value={detail.note}
            onChange={(e) => handleDetailChange(index, 'note', e.target.value)}
            placeholder="Note"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddDetail}>
        詳細を追加
      </button>
      <button type="submit">送信</button>
    </form>
  );
};

export default PurchaseOrderForm;
