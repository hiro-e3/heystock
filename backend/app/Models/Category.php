<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * @mixed Illuminate\Database\Eloquent\Builder
 */
class Category extends Model
{
    //
    protected $fillable = ['name', 'description'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
