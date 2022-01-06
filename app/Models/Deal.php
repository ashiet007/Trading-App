<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    use HasFactory;

    const CRYPTOCURRENCY = 'Cryptocurrency', STOCKS = 'Stocks', FOREX = 'Forex';

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function stock()
    {
        return $this->belongsTo(Stock::class, 'market', 'ticker');
    }
}
