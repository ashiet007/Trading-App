<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBackdatedReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('backdated_reports', function (Blueprint $table) {
            $table->id();
            $table->string('base_asset')->nullable();
            $table->string('quote_asset')->nullable();
            $table->string('transaction_type')->nullable();
            $table->string('open_level')->nullable();
            $table->string('close_level')->nullable();
            $table->string('size')->nullable();
            $table->string('profil_n_loss')->nullable();
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
        Schema::dropIfExists('backdated_reports');
    }
}
