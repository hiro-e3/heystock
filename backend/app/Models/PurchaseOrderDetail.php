<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrderDetail extends Model
{
    /** @use HasFactory<\Database\Factories\PurchaseOrderDetailFactory> */
    use HasFactory;

    protected $fillable = [
        'purchase_order_id',
        'product_id',
        'quantity',
        'price',
        'note',
    ];

    public function order()
    {
        return $this->belongsTo(PurchaseOrder::class);
    }
}
