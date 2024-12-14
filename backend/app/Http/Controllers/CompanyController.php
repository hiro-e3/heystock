<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Validation\Rule;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Company::query();

        $type = $request->query('type');
        if($type === null) {
            return response()->json($query->get(), 200);
        }

        if(is_string($type) && in_array($type, ['manufacturer', 'supplier', 'customer'])) {
            $query = $query->whereRaw('FIND_IN_SET(?, company_type)', $type);
        } else {
            return response()->json(['message' => 'Invalid type parameter'], 400);
        }

        return response()->json($query->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'code' => 'required|string|unique:companies',
                'company_type' => ['required','array', Rule::in(['manufacturer', 'supplier', 'customer'])],
                'name' => 'required|string',
                'short_name' => 'required|string',
                'kana_name' => 'required|string',
                'representative' => 'required|string',
                'postal_code' => 'required|string',
                'address' => 'required|string',
                'phone' => 'required|string',
                'fax' => 'required|string',
                'email' => 'required|email',
                'url' => 'required_if:url,""',
                'description' => ['string', 'nullable'],
            ]
            );

        $company = Company::create($validated);
        return response()->json($company, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Company::find($id), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
