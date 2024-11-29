<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'contact_person',
        'description',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
