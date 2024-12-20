<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Company;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseOrder>
 */
class PurchaseOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'supplier_id' => Company::query()->whereRaw('FIND_IN_SET(?, company_type)', 'supplier')->inRandomOrder()->first()->id,
            'user_id' => User::first()->id,
            'order_date' => $this->faker->date(),
            'delivery_date' => $this->faker->date(),
            'note' => $this->faker->text(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
