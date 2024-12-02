<?php

namespace App\Models;

use App\Traits\QueryHelpers;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use QueryHelpers;

    protected $fillable = ['name', 'description', 'unit_price', 'category_id', 'manufacturer_id'];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class);
    }
}
