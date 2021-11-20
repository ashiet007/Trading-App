<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Throwable;

class OrderController extends Controller
{
    public function getOrders()
    {
        try {
            $openOrders = Order::where('user_id', auth('api')->user()->id)
                ->where('status', 'open')
                ->get();
            $closedOrders = Order::where('user_id', auth('api')->user()->id)
                ->where('status', 'closed')
                ->get();
            return response()->json([
                'open_orders' => $openOrders,
                'closed_orders' => $closedOrders
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function getCurrencyPrice(Request $request)
    {
        $currency = $request->currency;
        if ($currency != '') {
            try {
                $url = env('BINANCE_URL') . "/api/v3/ticker/price";
                $response = Http::get($url, [
                    'symbol' => $currency
                ]);
                if ($response->successful() && $response->status() == 200) {
                    $responseData = $response->json();
                    return response()->json([
                        'price' => $responseData['price']
                    ]);
                } else {
                    return response()->json([
                        'message' => $response->json()
                    ], 200);
                }
            } catch (Throwable $e) {
                return response()->json([
                    'message' => $e->getMessage()
                ], 400);
            }
        } else {
            return response()->json([
                'price' => 0
            ], 200);
        }
    }

    public function createOrder(Request $request)
    {
        try {
            DB::beginTransaction();
            $requestData = $request->except('amount');
            $requestData['user_id'] = auth('api')->user()->id;
            $requestData['status'] = 'open';
            $order = Order::create($requestData);
            WalletTransaction::create([
                'user_id' => auth('api')->user()->id,
                'amount' => $request->amount,
                'type' => WalletTransaction::DEBIT,
                'event_type' => WalletTransaction::ORDER_OPEN,
                'order_id' => $order->id,
                'comment' => 'Wallet has been debited for opening a order'
            ]);
            auth('api')->user()->updateWallet($requestData['user_id']);
            $orders = Order::all();
            DB::commit();
            return response()->json([
                'orders' => $orders
            ], 201);
        } catch (Throwable $e) {
            DB::rollback();
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
