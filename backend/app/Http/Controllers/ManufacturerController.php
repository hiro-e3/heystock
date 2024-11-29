<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manufacturer;

class ManufacturerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Manufacturer::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $manufacturer = Manufacturer::create($request->all());
        return response()->json($manufacturer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Manufacturer::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $manufacturer = Manufacturer::findOrFail($id);
        $manufacturer->update($request->all());
        return response()->json($manufacturer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $manufacturer = Manufacturer::findOrFail($id);
        $manufacturer->delete();
        return response()->json(null, 204);
    }
}
