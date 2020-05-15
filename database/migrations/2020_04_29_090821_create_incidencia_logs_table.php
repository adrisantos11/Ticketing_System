<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncidenciaLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incidencia_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('incidencia_id');
            $table->integer('user_id');
            $table->enum('state', ['todo', 'doing', 'blocked', 'done']);
            $table->text('comment')->nullable();
            $table->dateTime('date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incidencia_logs');
    }
}
