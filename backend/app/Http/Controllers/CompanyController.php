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
        $query = Company::query()
            ->applySort($request->query('sort'))
            ->applyIncludes($request->query('includes'))
            ->applyFields($request->query('fields'));

        $paginateStrategy = $request->query('paginate');
        $perPage = $request->query('per_page', 20);

        $type = $request->query('type');
        if (is_string($type) && in_array($type, ['manufacturer', 'supplier', 'customer'])) {
            $query = $query->whereRaw('FIND_IN_SET(?, company_type)', $type);
        }

        switch ($paginateStrategy) {
            case 'simple':
                $query = $query->simplePaginate($perPage);
                break;
            case 'cursor':
                $query = $query->cursorPaginate($perPage);
                break;
            default:
                $query = $query->paginate($perPage);
                break;
        }

        return response()->json($query, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'code' => 'required|string|unique:companies',
                'company_type' => ['required', 'array', Rule::in(['manufacturer', 'supplier', 'customer'])],
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
        $validated = $request->validate(
            [
                'code' => 'string',
                'company_type' => ['array', Rule::in(['manufacturer', 'supplier', 'customer'])],
                'name' => 'string',
                'short_name' => 'string',
                'kana_name' => 'string',
                'representative' => 'string',
                'postal_code' => 'string',
                'address' => 'string',
                'phone' => 'string',
                'fax' => 'string',
                'email' => 'email',
                'url' => 'required_if:url,""',
                'description' => ['string', 'nullable'],
            ]
        );

        $company = Company::find($id);
        $company->update($validated);
        return response()->json($company, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Company::destroy($id);
        return response()->json(null, 204);
    }
}
