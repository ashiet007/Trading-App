<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDealsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deals', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('market')->nullable();
            $table->string('type')->nullable();
            $table->float('size')->nullable();
            $table->float('opening')->nullable();
            $table->float('latest')->nullable();
            $table->float('stop')->nullable();
            $table->float('limit')->nullable();
            $table->float('profit_loss')->nullable();
            $table->string('currency')->nullable();
            $table->timestamp('closed_at')->nullable();
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
        Schema::dropIfExists('deals');
    }
}
