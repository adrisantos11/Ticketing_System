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
            $table->integer('group_id');
            $table->integer('id_reporter');
            $table->integer('id_assigned');
            $table->string('title');
            $table->string('description')->nullable()->default('Without description');
            $table->string('department');
            $table->string('category');
            $table->string('build');
            $table->integer('floor');
            $table->string('class');
            $table->string('url_data')->nullable();
            $table->dateTime('creation_date');
            $table->dateTime('limit_date');
            $table->dateTime('assigned_date');
            $table->dateTime('resolution_date');
            $table->enum('priority', ['critical', 'important', 'trivial'])->nullable()->default('trivial');
            $table->enum('state', ['todo', 'doing', 'blocked', 'done'])->nullable()->default('todo');
            
            // $table->timestamps();
            // $table->foreign('Grupo_ID')->refernces('ID')->on('GrupoIncidencias');
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
