<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalletTransaction extends Model
{
    use HasFactory;

    const CREDIT = 'Credit', DEBIT = 'Debit';

    const ADD = 'add', WITHDRAWAL = 'withdrawal', ORDER_OPEN = 'order_open', ORDER_CLOSED = 'order_closed', DEAL_OPEN = 'deal_open', DEAL_CLOSED = 'deal_closed', OTHER = 'other';

    protected $guarded = [];
}
