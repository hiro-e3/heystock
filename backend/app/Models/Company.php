<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\CompanyType;
use App\Traits\QueryHelpers;
use Illuminate\Database\Eloquent\Casts\AsEnumArrayObject;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use function Illuminate\Log\log;

class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    use HasFactory,QueryHelpers;

    protected $fillable = [
        'code',
        'company_type',
        'name',
        'short_name',
        'kana_name',
        'representative',
        'postal_code',
        'address',
        'phone',
        'fax',
        'email',
        'url',
        'description',
    ];

    public function supplyProducts(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_supplier', 'supplier_id', 'product_id');
    }

    protected function companyType(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => array_map(fn($casted) => CompanyType::from($casted), explode(',', $value)),
            set: function(array | string $value) {
                if (is_string($value)) {
                    $value = explode(',', $value);
                } elseif (!is_array($value)) {
                    log('Invalid value for company_type attribute');
                    return;
                }

                return implode(',', array_map(function($value) {
                    if($value instanceof CompanyType) {
                        return $value->value;
                    } elseif(is_string($value)) {
                        return CompanyType::from($value)->value;
                    }
                }, $value));
            }
        );
    }
}
