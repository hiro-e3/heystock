<?php

namespace App\Http\Resources;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'company_type' => $this->company_type,
            'name' => $this->name,
            'short_name' => $this->short_name,
            'kana_name' => $this->kana_name,
            'representative' => $this->representative,
            'postal_code' => $this->postal_code,
            'address' => $this->address,
            'phone' => $this->phone,
            'fax' => $this->fax,
            'email' => $this->email,
            'url' => $this->url,
            'description' => $this->description,
            'supply_products' => $this->supplyProducts,
        ];
    }
}
