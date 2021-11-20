<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cryptocurrency;
use App\Models\Forex;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Throwable;

class PolygonController extends Controller
{
    /**
     * Get All Stocks Tickers
     */
    public function getAllStocks(Request $request)
    {
        try {
            if ($request->has('lastId')) {
                $stocks = Stock::where('id', '>', $request->lastId)->limit(10)->get();
            } else if ($request->has('search')) {
                $stocks = Stock::where('ticker', 'LIKE', "%$request->search%")
                    ->orWhere('name', 'LIKE', "%$request->search%")
                    ->limit(10)
                    ->get();
            } else {
                $stocks = Stock::limit(10)->get();
            }
            return response()->json([
                "stocks" => $stocks,
                "last_id" => count($stocks) >= 10 && $stocks->last() ? $stocks->last()->id : null
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * Get all forexes
     */
    public function getAllForexes(Request $request)
    {
        try {
            if ($request->has('lastId')) {
                $forexes = Forex::where('id', '>', $request->lastId)->limit(10)->get();
            } else if ($request->has('search')) {
                $forexes = Forex::where('ticker', 'LIKE', "%$request->search%")
                    ->orWhere('name', 'LIKE', "%$request->search%")
                    ->limit(10)
                    ->get();
            } else {
                $forexes = Forex::limit(10)->get();
            }
            return response()->json([
                "forexes" => $forexes,
                "last_id" => count($forexes) >= 10 && $forexes->last() ? $forexes->last()->id : null
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * Get all Cryptocurrencies
     */
    public function getAllCryptocurrencies()
    {
        $cryptocurrencies = Cryptocurrency::all();
        return response()->json([
            'cryptocurrencies' => $cryptocurrencies
        ], 200);
    }

    /**
     * Get Market Status
     */
    public function marketStatus()
    {
        try {
            $url = env("POLYGON_API") . '/v1/marketstatus/now';
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env("MIX_POLYGON_API_KEY")
            ])->get($url);
            if ($response->successful() && $response->status() == 200) {
                $responseData = $response->json();
                $marketStatus = $responseData['market'];
                return response()->json([
                    'status' => $marketStatus
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Something went wrong'
                ], 400);
            }
        } catch (Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * Get Last Quotes
     */
    public function lastQuotes(Request $request)
    {
        try {
            $tickers = json_decode($request->tickers, true);
            $quotes = [];
            foreach ($tickers as $ticker) {
                $url = env("POLYGON_API") . '/v2/last/nbbo/' . $ticker;
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . env("MIX_POLYGON_API_KEY")
                ])->get($url);
                if ($response->successful() && $response->status() == 200) {
                    $responseData = $response->json();
                    $quotes[] = $responseData['results'];
                }
            }
            return response()->json([
                'quotes' => $quotes
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    /**
     * Get Last Forex Quotes
     */
    public function lastForexQuotes(Request $request)
    {
        try {
            $tickers = json_decode($request->tickers, true);
            $quotes = [];
            foreach ($tickers as $ticker) {
                $url = env("POLYGON_API") . '/v1/last_quote/currencies/' . $ticker;
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . env("MIX_POLYGON_API_KEY")
                ])->get($url);
                if ($response->successful() && $response->status() == 200) {
                    $responseData = $response->json();
                    $quotes[] = $responseData;
                }
            }
            return response()->json([
                'quotes' => $quotes
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Something went wrong'
            ], 400);
        }
    }
}
