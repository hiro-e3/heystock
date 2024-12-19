<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use App\Http\Resources\InventoryResource;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $inventories = Inventory::with(['product', 'warehouse'])
            ->applySort($request->query('sort'))
            ->applyIncludes($request->query('includes'))
            ->applyFields($request->query('fields'))
            ->paginate();

        return InventoryResource::collection($inventories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'note' => 'nullable|string',
        ]);

        $inventory = Inventory::create($validatedData);
        return response()->json($inventory, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        $inventory->load(['product', 'warehouse']);
        return new InventoryResource($inventory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventory $inventory)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'note' => 'nullable|string',
        ]);

        $inventory->update($validatedData);
        return response()->json($inventory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        return response()->json(null, 204);
    }
}
