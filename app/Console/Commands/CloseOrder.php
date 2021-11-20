<?php

namespace App\Console\Commands;

use App\Models\Order;
use App\Models\User;
use App\Models\WalletTransaction;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class CloseOrder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'close:orders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Close open orders';

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
        Log::info("Command run");
        $this->updateOrder(); //10 sec to run in worst case
        sleep(10);
        $this->updateOrder(); //10 sec to run in worst case
        sleep(10);
        $this->updateOrder(); //10 sec to run in worst case
        return 0;
    }

    public function updateOrder()
    {
        try {
            $openOrders = Order::where('status', 'open')->get();
            if (count($openOrders)) {
                $url = env('BINANCE_URL') . "/api/v3/ticker/price";
                $response = Http::get($url);
                if ($response->successful() && $response->status() == 200) {
                    $responseData = $response->json();
                    $openOrders = Order::where('status', 'open')->get();
                    foreach ($openOrders as $order) {
                        $tickers = array_filter($responseData, function ($ticker) use ($order) {
                            if ($ticker['symbol'] == $order->crypto_currency) {
                                return $ticker;
                            }
                        });
                        $tickers = array_values($tickers);
                        if (count($tickers)) {
                            DB::beginTransaction();
                            Log::info("Ticker price: " . $tickers[0]['price']);
                            if ($tickers[0]['price'] >= $order->selling_price) {
                                $updatedPrice = $order->coins * $tickers[0]['price'];
                                $profit = $updatedPrice - $order->betting_amount;
                                WalletTransaction::create([
                                    'user_id' => $order->user_id,
                                    'amount' => $profit,
                                    'type' => WalletTransaction::CREDIT,
                                    'event_type' => WalletTransaction::ORDER_CLOSED,
                                    'order_id' => $order->id,
                                    'comment' => 'Wallet has been credit with profit for Order Id #' . $order->id
                                ]);
                                $user = User::find($order->user_id);
                                $user->updateWallet($order->user_id);
                                $order->update([
                                    'status' => 'Closed'
                                ]);
                            } else if ($tickers[0]['price'] <= $order->stop_loss_price) {
                                $updatedPrice = $order->coins * $tickers[0]['price'];
                                $loss = $order->betting_amount - $updatedPrice;
                                WalletTransaction::create([
                                    'user_id' => $order->user_id,
                                    'amount' => $loss,
                                    'type' => WalletTransaction::DEBIT,
                                    'event_type' => WalletTransaction::ORDER_CLOSED,
                                    'order_id' => $order->id,
                                    'comment' => 'Wallet has been debited with loss for Order Id #' . $order->id
                                ]);
                                $user = User::find($order->user_id);
                                $user->updateWallet($order->user_id);
                                $order->update([
                                    'status' => 'Closed'
                                ]);
                            }
                            DB::commit();
                        }
                    }
                } else {
                    DB::rollback();
                    Log::error("order update error 1: " . json_encode($response->json()));
                }
            }
        } catch (Throwable $e) {
            DB::rollback();
            Log::error("order update error 2: " . $e->getMessage());
        }
    }
}
