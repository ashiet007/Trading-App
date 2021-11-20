<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ticker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Throwable;

class HomeController extends Controller
{
    public function orderBooks(Request $request)
    {
        try {
            $symbol = $request->symbol;
            $url = env('BINANCE_URL') . "/api/v3/depth";
            $response = Http::get($url, [
                'symbol' => $symbol,
                'limit' => 10
            ]);
            if ($response->successful() && $response->status() == 200) {
                $data = [];
                $responseData = $response->json();
                for ($i = 0; $i < 10; $i++) {
                    $data[$i]['bid'] = $responseData['bids'][$i];
                    $data[$i]['ask'] = $responseData['asks'][$i];
                }
                return response()->json([
                    'order_books' => $data
                ]);
            } else {
                return response()->json([
                    'message' => $response->json()
                ]);
            }
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }

    public function tradeHistory(Request $request)
    {
        try {
            $symbol = $request->symbol;
            $url = env('BINANCE_URL') . "/api/v3/trades";
            $response = Http::get($url, [
                'symbol' => $symbol,
                'limit' => 10
            ]);
            if ($response->successful() && $response->status() == 200) {
                return response()->json([
                    'trade_history' => $response->json()
                ]);
            } else {
                return response()->json([
                    'message' => $response->json()
                ]);
            }
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }

    public function tickerData()
    {
        try {
            $url = env('BINANCE_URL') . "/api/v3/ticker/24hr";
            $response = Http::get($url);
            if ($response->successful() && $response->status() == 200) {
                $responseData = $response->json();
                $tickers = array_filter($responseData, function ($ticker) {
                    if (substr($ticker['symbol'], -3) == 'GBP') {
                        return $ticker;
                    }
                });
                $tickers = array_values($tickers);
                return response()->json($tickers);
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
    }

    public function symbolInformation(Request $request)
    {
        try {
            $url = env('BINANCE_URL') . "/api/v3/exchangeInfo";
            $response = Http::get($url, [
                'symbol' => $request->symbol
            ]);
            if ($response->successful() && $response->status() == 200) {
                $responseData = $response->json();
                $symbol = $responseData['symbols'][0];
                $filters = $symbol['filters'];
                $tickSize = 0;
                $tick = '';
                foreach ($filters as $filter) {
                    if ($filter['filterType'] == 'PRICE_FILTER') {
                        $tick = $filter['tickSize'];
                        $tickSize = $this->getDecCount($tick);
                        break;
                    }
                }
                return response()->json([
                    'tick_size' => $tickSize,
                    'tick' => $tick
                ], 200);
            } else {
                return response()->json([
                    'message' => $response->json()
                ], 400);
            }
        } catch (Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
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

    public function tickers()
    {
        $tickers = Ticker::all();
        return response()->json([
            'tickers' => $tickers
        ], 200);
    }
}
