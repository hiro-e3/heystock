<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PurchaseOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(PurchaseOrder::query()->paginate(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'order_date' => 'required|date',
            'supplier_id' => 'required|integer|exists:suppliers,id',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date',
            'note' => 'string',
            'details' => 'required|array',
            'details.*.product_id' => 'required|integer|exists:products,id',
            'details.*.quantity' => 'required|integer|min:1',
            'details.*.price' => 'required|numeric|min:0',
            'details.*.note' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        // トランザクション開始
        DB::beginTransaction();
        try {
            // 親テーブル（purchase_orders）の登録
            $purchaseOrder = PurchaseOrder::create([
                'order_date' => $request->order_date,
                'supplier_id' => $request->supplier_id,
                'delivery_date' => $request->delivery_date ?? null,
                'note' => $request->note,
                'user_id' => Auth::user()->getAuthIdentifier(),
            ]);

            // 子テーブル（purchase_order_details）の登録
            foreach ($request->details as $detailData) {
                // リレーションを利用して紐づけた上でcreate
                $purchaseOrder->details()->create([
                    'product_id' => $detailData['product_id'],
                    'quantity' => $detailData['quantity'],
                    'price' => $detailData['price'],
                ]);
            }

            // 問題なければコミット
            DB::commit();

            return response()->json([
                'message' => 'Purchase order and details created successfully.',
                'data' => $purchaseOrder->load('purchaseOrderDetails'),
            ], 201);

        } catch (\Exception $e) {
            // エラー発生時はロールバック
            DB::rollBack();

            return response()->json([
                'error' => 'Failed to create purchase order.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(PurchaseOrder::query()->with(['details', 'details.product'])->findOrFail($id), 200);
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
