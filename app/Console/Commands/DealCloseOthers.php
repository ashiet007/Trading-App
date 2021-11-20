<?php

namespace App\Console\Commands;

use App\Models\Deal;
use App\Models\WalletTransaction;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class DealCloseOthers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deal:closeothers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $openStocksDeals = Deal::where('market_type', Deal::STOCKS)->whereNull('closed_at')->get();
        foreach ($openStocksDeals as $deal) {
            $url = env("POLYGON_API") . '/v2/last/nbbo/' . $deal->market;
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env("MIX_POLYGON_API_KEY")
            ])->get($url);
            if ($response->successful() && $response->status() == 200) {
                $responseData = $response->json();
                $quotes = $responseData['results'];
                foreach ($quotes as $quote) {
                    $stopPoint = null;
                    $limitPoint = null;
                    if ($deal->stop != null) {
                        if ($deal->type == 'buy') {
                            $stopPoint = $quote['bid_price'] - ($deal->stop * $deal->tick_size);
                        } else {
                            $stopPoint = $quote['ask_price'] + ($deal->stop * $deal->tick_size);
                        }
                    }
                    if ($deal->limit != null) {
                        if ($deal->type == 'buy') {
                            $limitPoint = $quote['bid_price'] + ($deal->limit * $deal->tick_size);
                        } else {
                            $limitPoint = $quote['ask_price'] - ($deal->limit * $deal->tick_size);
                        }
                    }
                    if ($deal->type == 'buy') {
                        if (($stopPoint != null && $stopPoint == $quote['bid_price']) || ($limitPoint != null && $limitPoint == $quote['bid_price'])) {
                            $userId = $deal->user_id;
                            if ($deal->type == 'sell') {
                                $ptsDiff = ($deal->opening - $quote['ask_price']) / $deal->tick_size;
                                $profitLoss = (int)($ptsDiff * $deal->size);
                            } else {
                                $ptsDiff = ($quote['bid_price'] - $deal->opening) / $deal->tick_size;
                                $profitLoss = (int)($ptsDiff * $deal->size);
                            }
                            $profitLoss = $profitLoss - (abs($profitLoss) * 0.025);
                            WalletTransaction::create([
                                'user_id' => $userId,
                                'amount' => $profitLoss,
                                'type' => WalletTransaction::CREDIT,
                                'event_type' => WalletTransaction::DEAL_CLOSED,
                                'order_id' => $deal->id,
                                'comment' => 'Wallet has been credited for closing Deal #' . $deal->id
                            ]);
                            $deal->user->updateWallet($userId);
                        }
                    } else {
                        if (($stopPoint != null && $stopPoint == $quote['ask_price']) || ($limitPoint != null && $limitPoint == $quote['ask_price'])) {
                            $userId = $deal->user_id;
                            if ($deal->type == 'sell') {
                                $ptsDiff = ($deal->opening - $quote['ask_price']) / $deal->tick_size;
                                $profitLoss = (int)($ptsDiff * $deal->size);
                            } else {
                                $ptsDiff = ($quote['bid_price'] - $deal->opening) / $deal->tick_size;
                                $profitLoss = (int)($ptsDiff * $deal->size);
                            }
                            $profitLoss = $profitLoss - (abs($profitLoss) * 0.025);
                            WalletTransaction::create([
                                'user_id' => $userId,
                                'amount' => $profitLoss,
                                'type' => WalletTransaction::CREDIT,
                                'event_type' => WalletTransaction::DEAL_CLOSED,
                                'order_id' => $deal->id,
                                'comment' => 'Wallet has been credited for closing Deal #' . $deal->id
                            ]);
                            $deal->user->updateWallet($userId);
                        }
                    }
                }
            }
        }

        $openStocksDeals = Deal::where('market_type', Deal::FOREX)->whereNull('closed_at')->get();
        foreach ($openStocksDeals as $deal) {
            $arrData = explode('/', $deal->market);
            $symbol = 'C:' . $arrData[0] . '/' . $arrData[1];
            $url = env("POLYGON_API") . '/vX/quotes/' . $symbol;
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env("MIX_POLYGON_API_KEY")
            ])->get($url);
            if ($response->successful() && $response->status() == 200) {
                $responseData = $response->json();
                $quotes = $responseData['results'];
                foreach ($quotes as $quote) {
                    $stopPoint = null;
                    $limitPoint = null;
                    if ($deal->stop != null) {
                        if ($deal->type == 'buy') {
                            $stopPoint = $quote['bid_price'] - ($deal->stop * $deal->tick_size);
                        } else {
                            $stopPoint = $quote['ask_price'] + ($deal->stop * $deal->tick_size);
                        }
                    }
                    if ($deal->limit != null) {
                        if ($deal->type == 'buy') {
                            $limitPoint = $quote['bid_price'] + ($deal->limit * $deal->tick_size);
                        } else {
                            $limitPoint = $quote['ask_price'] - ($deal->limit * $deal->tick_size);
                        }
                    }
                    if ($deal->type == 'buy') {
                        if (($stopPoint != null && $stopPoint == $quote['bid_price']) || ($limitPoint != null && $limitPoint == $quote['bid_price'])) {
                            $userId = $deal->user_id;
                            if ($deal->type == 'sell') {
                                $ptsDiff = ($deal->opening - $quote['ask_price']) / $deal->tick_size;
                                $profitLoss = (int)($ptsDiff * $deal->size);
                            } else {
                                $ptsDiff = ($quote['bid_price'] - $deal->opening) / $deal->tick_size;
                                $profitLoss = (int)($ptsDiff * $deal->size);
                            }
                            $profitLoss = $profitLoss - (abs($profitLoss) * 0.025);
                            WalletTransaction::create([
                                'user_id' => $userId,
                                'amount' => $profitLoss,
                                'type' => WalletTransaction::CREDIT,
                                'event_type' => WalletTransaction::DEAL_CLOSED,
                                'order_id' => $deal->id,
                                'comment' => 'Wallet has been credited for closing Deal #' . $deal->id
                            ]);
                            $deal->user->updateWallet($userId);
                        }
                    } else {
                        if (($stopPoint != null && $stopPoint == $quote['ask_price']) || ($limitPoint != null && $limitPoint == $quote['ask_price'])) {
                            $userId = $deal->user_id;
                            if ($deal->type == 'sell') {
                                $ptsDiff = ($deal->opening - $quote['ask_price']) / $deal->tick_size;
                                $profitLoss = (int)($ptsDiff * $deal->size);
                            } else {
                                $ptsDiff = ($quote['bid_price'] - $deal->opening) / $deal->tick_size;
                                $profitLoss = (int)($ptsDiff * $deal->size);
                            }
                            $profitLoss = $profitLoss - (abs($profitLoss) * 0.025);
                            WalletTransaction::create([
                                'user_id' => $userId,
                                'amount' => $profitLoss,
                                'type' => WalletTransaction::CREDIT,
                                'event_type' => WalletTransaction::DEAL_CLOSED,
                                'order_id' => $deal->id,
                                'comment' => 'Wallet has been credited for closing Deal #' . $deal->id
                            ]);
                            $deal->user->updateWallet($userId);
                        }
                    }
                }
            }
        }
        return 0;
    }
}
