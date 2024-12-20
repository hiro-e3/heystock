<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::query()->inRandomOrder()->first()->id,
            'warehouse_id' => Warehouse::query()->inRandomOrder()->first()->id,
            'quantity' => random_int(1, 100),
            'price' => random_int(1000, 10000),
            'note' => $this->faker->sentence(),
        ];
    }
}
