<?php

namespace App\Imports;

use App\Models\Deal;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class DealImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if ($row['market_type'] == Deal::CRYPTOCURRENCY) {
                $tick = $this->getTickerInfo($row['symbol']);
            } else if ($row['market_type'] == Deal::STOCKS) {
                $tick = 0.01;
            } else {
                $tick = 0.0001;
            }

            if ($row['type'] == 'sell') {
                $ptsDiff = ($row['opening'] - $row['closing']) / $tick;
                $profitLoss = (float)($ptsDiff * $row['size']);
            } else {
                $ptsDiff = ($row['closing'] - $row['opening']) / $tick;
                $profitLoss = (float)($ptsDiff * $row['size']);
            }
            Deal::create([
                'user_id' => 0,
                'market' => $row['symbol'],
                'type' => $row['type'],
                'size' => $row['size'],
                'opening' => $row['opening'],
                'latest' => $row['closing'],
                'profit_loss' => $profitLoss,
                'tick_size' => $tick,
                'market_type' => $row['market_type'],
                'created_at' => Carbon::parse($row['opened_at']),
                'closed_at' => Carbon::parse($row['closed_at'])
            ]);
        }
    }

    public function getTickerInfo($symbol)
    {
        $url = env('BINANCE_URL') . "/api/v3/exchangeInfo";
        $response = Http::get($url, [
            'symbol' => $symbol
        ]);
        $tick = 0.01;
        if ($response->successful() && $response->status() == 200) {
            $responseData = $response->json();
            $symbol = $responseData['symbols'][0];
            $filters = $symbol['filters'];
            foreach ($filters as $filter) {
                if ($filter['filterType'] == 'PRICE_FILTER') {
                    $tick = $filter['tickSize'];
                    break;
                }
            }
            return $tick;
        } else {
            return $tick;
        }
    }
}
