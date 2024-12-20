<?php

namespace App\Models;

use App\Traits\QueryHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    use QueryHelpers, HasFactory;

    protected $fillable = ['name', 'description', 'unit_price', 'category_id', 'manufacturer_id'];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function manufacturer()
    {
        return $this->belongsTo(Company::class,'manufacturer_id','id');
    }

    public function suppliers()
    {
        return $this->belongsToMany(Company::class, 'product_supplier', 'product_id', 'supplier_id');
    }

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

    public function totalInventory(): Attribute
    {
        return Attribute::make(
            get: function () {

                return $this->inventories()->sum('quantity');
            }
        );
    }
}
