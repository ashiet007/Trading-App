<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('betting_amount')->nullable();
            $table->string('crypto_currency')->nullable();
            $table->double('current_price')->nullable();
            $table->double('coins')->nullable();
            $table->double('selling_price')->nullable();
            $table->double('stop_loss_price')->nullable();
            $table->string('currency')->nullable();
            $table->string('status')->comment('Open, Closed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
