<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PurchaseOrder extends Model
{
    /** @use HasFactory<\Database\Factories\PurchaseOrderFactory> */
    use HasFactory;

    protected $fillable = [
        'supplier_id',
        'user_id',
        'order_date',
        'delivery_date',
        'note',
    ];

    public function supplier(): HasOne
    {
        return $this->hasOne(Company::class, 'id', 'supplier_id');
    }

    public function details(): HasMany
    {
        return $this->hasMany(PurchaseOrderDetail::class);
    }

    public function totalPrice(): Attribute
    {
        return Attribute::make(
            get: function () {

                return $this->details()->sum('price');
            }
        );
    }
}
