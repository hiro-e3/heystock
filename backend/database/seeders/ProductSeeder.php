<?php

namespace Database\Seeders;

use App\Enums\CompanyType;
use App\Models\Company;
use App\Models\Manufacturer;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $aica = Company::factory()->create([
            'name' => 'アイカ工業株式会社',
            'company_type' => [CompanyType::Manufacturer, CompanyType::Supplier],
            'short_name' => 'アイカ',
            'kana_name' => 'アイカ',
            'postal_code' => '450-0002',
            'address' => '愛知県名古屋市中村区名駅一丁目1番1号 JPタワー名古屋26階',
            'phone' => '052-409-8313',
            'fax' => '052-409-8314',
            'email' => 'contact@aica.co.jp',
            'representative' => '菊田',
            'url' => 'https://www.aica.co.jp/',
            'description' => '化成品事業、建装建材事業',
        ]);

        $color_fit = ProductCategory::factory()->create([
            'name' => 'カラーシステムフィット',
            'description' => 'K-, KJ-',
        ]);

        $celsus = ProductCategory::factory()->create([
            'name' => 'セルサス',
            'description' => 'TJ-, TJY, Tk-, TKJ',
        ]);

        $ribbean = ProductCategory::factory()->create([
            'name' => 'ラビアン',
            'description' => 'JC-, JI-, 他',
        ]);


        Product::factory()->count(200)->sequence(fn (Sequence $sequence) => [
            'name' => fake()->randomElement(['K-', 'KJ-']) . fake()->numberBetween(6000, 6999),
        ])->for($color_fit, 'category')->for($aica, 'manufacturer')->create([
            'description' => 'アイカ カラーシステムフィット',
            'unit_price' => 9000,
        ]);

        Product::factory()->count(20)->sequence(fn (Sequence $sequence) => [
            'name' => fake()->randomElement(['TJ-', 'TJY', 'Tk-', 'TKJ']) . fake()->numberBetween(10100, 12000) . fake()->randomElement(['', 'K', 'KQ', 'KQ98']),
        ])->for($celsus, 'category')->for($aica, 'manufacturer')->create([
            'description' => 'アイカ セルサス',
            'unit_price' => 13000,
        ]);

        Product::factory()->count(100)->sequence(fn (Sequence $sequence) => [
            'name' => fake()->randomElement(['JC-', 'JI-']) . fake()->numberBetween(1000, 1999),
        ])->for($ribbean, 'category')->for($aica, 'manufacturer')->create([
            'description' => 'アイカ ラビアン',
            'unit_price' => 10000,
        ]);
    }
}
