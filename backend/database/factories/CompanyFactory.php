<?php

namespace Database\Factories;

use App\Enums\CompanyType;
use App\Models\Company;
use BackedEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => fake()->unique()->regexify('[A-Z]{3}[0-9]{3}'),
            'company_type' => fake()->randomElements(CompanyType::cases(), fake()->numberBetween(1, 3)),
            'name' => fake()->company(),
            'short_name' => fake()->companySuffix(),
            'kana_name' => fake()->companySuffix(),
            'representative' => fake()->name(),
            'postal_code' => fake()->postcode(),
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'fax' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'url' => fake()->url(),
            'description' => fake('ja')->paragraph(),
        ];
    }
}
