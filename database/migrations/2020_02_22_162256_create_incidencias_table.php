<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncidenciasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incidencias', function (Blueprint $table) {
            $table->bigInteger('id')->autoIncrement()->unique();
            $table->integer('group_id')->nullable();
            $table->integer('id_reporter');
            $table->integer('id_assigned')->nullable();
            $table->integer('supervisor')->nullable();
            $table->integer('id_team')->nullable();
            $table->string('title');
            $table->longText('description')->nullable();
            $table->string('category');
            $table->string('build');
            $table->integer('floor');
            $table->string('class');
            $table->string('url_data')->nullable();
            $table->dateTime('creation_date');
            $table->dateTime('limit_date')->nullable();
            $table->dateTime('assigned_date')->nullable();
            $table->dateTime('resolution_date')->nullable();
            $table->enum('priority', ['critical', 'important', 'trivial'])->default('trivial');
            $table->enum('state', ['todo', 'doing', 'blocked', 'done'])->default('todo');     
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incidencias');
    }
}
