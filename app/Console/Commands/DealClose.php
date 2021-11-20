<?php

namespace App\Console\Commands;

use App\Models\Deal;
use App\Models\WalletTransaction;
use Illuminate\Console\Command;
use Binance\API;

class DealClose extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deal:close';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Close deal';

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
        //Close Binance deal
        $api = new \Binance\API(env('BINANCE_API_KEY'), env("BINANCE_API_SECRET"));
        $openCryptoDeals = Deal::where('market_type', Deal::CRYPTOCURRENCY)->whereNull('closed_at')->get();
        $api->ticker(false, function ($api, $symbol, $ticker) use ($openCryptoDeals) {
            foreach ($openCryptoDeals as $deal) {
                if ($deal->market == $symbol) {
                    $stopPoint = null;
                    $limitPoint = null;
                    if ($deal->stop != null) {
                        if ($deal->type == 'buy') {
                            $stopPoint = $ticker->bestBid - ($deal->stop * $deal->tick_size);
                        } else {
                            $stopPoint = $ticker->bestAsk + ($deal->stop * $deal->tick_size);
                        }
                    }
                    if ($deal->limit != null) {
                        if ($deal->type == 'buy') {
                            $limitPoint = $ticker->bestBid + ($deal->limit * $deal->tick_size);
                        } else {
                            $limitPoint = $ticker->bestAsk - ($deal->limit * $deal->tick_size);
                        }
                    }
                    if ($deal->type == 'buy') {
                        if (($stopPoint != null && $stopPoint == $ticker->bestBid) || ($limitPoint != null && $limitPoint == $ticker->bestBid)) {
                            $userId = $deal->user_id;
                            if ($deal->type == 'sell') {
                                $ptsDiff = ($deal->opening - $ticker->bestAsk) / $deal->tick_size;
                                $profitLoss = (int)($ptsDiff * $deal->size);
                            } else {
                                $ptsDiff = ($ticker->bestBid - $deal->opening) / $deal->tick_size;
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
                        if (($stopPoint != null && $stopPoint == $ticker->bestAsk) || ($limitPoint != null && $limitPoint == $ticker->bestAsk)) {
                            $userId = $deal->user_id;
                            if ($deal->type == 'sell') {
                                $ptsDiff = ($deal->opening - $ticker->bestAsk) / $deal->tick_size;
                                $profitLoss = (int)($ptsDiff * $deal->size);
                            } else {
                                $ptsDiff = ($ticker->bestBid - $deal->opening) / $deal->tick_size;
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
        });
        return 0;
    }
}
