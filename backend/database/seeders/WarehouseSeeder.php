<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Warehouse::factory()->count(3)->create([
            'name' => '倉庫'.fake()->randomElement(['A', 'B', 'C']),
            'location' => '北海道'.fake()->randomElement(['札幌市', '函館市', '旭川市', '釧路市', '帯広市']),
            'note' => '',
        ]);
    }
}
