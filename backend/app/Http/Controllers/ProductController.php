<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Schema;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 20);

        return new ProductCollection(Product::paginate($perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'required|numeric',
            'category_id' => 'nullable|exists:product_categories,id',
            'manufacturer_id' => 'nullable|exists:companies,id',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, int $id)
    {
        $pretty_print = $request->has('pretty') ? \JSON_PRETTY_PRINT : 0;
        $product = Product::query()->applyIncludes($request->query('includes'))->applyFields($request->query('fields'))->find($id);
        if ($product) {
            return response()->json($product, 200, [], $pretty_print);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'numeric',
            'category_id' => 'nullable|exists:product_categories,id',
            'manufacturer_id' => 'nullable|exists:companies,id',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validated);

        return response()->json(['message' => '商品の更新に成功しました', 'data' => $product], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => '商品の削除に成功しました'], 200);
    }
}
