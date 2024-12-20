<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('code', 15)->unique();
            $table->set('company_type', ['manufacturer', 'supplier', 'customer']);
            $table->string('name', 255)->default('');
            $table->string('short_name', 255)->default('');
            $table->string('kana_name', 255)->default('');
            $table->string('representative', 100)->default('');
            $table->string('postal_code', 10)->default('');
            $table->string('address', 255)->default('');
            $table->string('phone', 20)->default('');
            $table->string('fax', 20)->default('');
            $table->string('email', 255)->default('');
            $table->string('url', 255)->default('');
            $table->text('description');
            $table->timestamps();
            $table->index(['code', 'company_type', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
