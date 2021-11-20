<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Models\WalletTransaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Throwable;

class DealController extends Controller
{
    public function saveDeal(Request $request)
    {
        try {
            $userId = auth('api')->user()->id;
            $requestData = $request->all();
            $requestData['user_id'] = $userId;
            $deal = Deal::create($requestData);
            return response()->json([
                'deals' => Deal::get()
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function closeDeal(Request $request)
    {
        try {
            $userId = auth('api')->user()->id;
            $requestData = $request->all();
            $requestData['user_id'] = $userId;
            $deal = Deal::find($requestData['deal_id']);
            $tickLength = $this->getDecCount($deal->tick_size);
            if ($deal->type == 'sell') {
                $ptsDiff = ($deal->opening - $request->latest) / $deal->tick_size;
                $profitLoss = (int)($ptsDiff * $deal->size);
            } else {
                $ptsDiff = ($request->latest - $deal->opening) / $deal->tick_size;
                $profitLoss = (int)($ptsDiff * $deal->size);
            }
            $profitLoss = $profitLoss - (abs($profitLoss) * 0.025);
            WalletTransaction::create([
                'user_id' => auth('api')->user()->id,
                'amount' => $profitLoss,
                'type' => WalletTransaction::CREDIT,
                'event_type' => WalletTransaction::DEAL_OPEN,
                'order_id' => $deal->id,
                'comment' => 'Wallet has been credited for closing Deal #' . $deal->id
            ]);
            auth('api')->user()->updateWallet($requestData['user_id']);
            $deal->update([
                'latest' => $request->latest,
                'profit_loss' => $profitLoss,
                'closed_at' => Carbon::now()
            ]);
            return response()->json([
                'deals' => Deal::get()
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function getAllDeals()
    {
        return response()->json([
            'deals' => Deal::get()
        ], 200);
    }

    public function getDecCount($f)
    {
        $num = 0;
        while (true) {
            if ((string)$f === (string)round($f)) {
                break;
            }
            if (is_infinite($f)) {
                break;
            }

            $f *= 10;
            $num++;
        }
        return $num;
    }
}
