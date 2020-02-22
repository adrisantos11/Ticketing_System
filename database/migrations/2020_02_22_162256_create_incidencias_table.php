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
            $table->bigInteger('ID_incidencia')->autoIncrement()->unique();
            $table->integer('Grupo_ID');
            $table->integer('ID_reportador');
            $table->integer('ID_asignado');
            $table->string('Titulo');
            $table->string('Descripcion')->nullable()->default('Sin descripción');
            $table->string('Departamento');
            $table->string('Edificio');
            $table->integer('Piso');
            $table->string('Aula');
            $table->string('URL_data')->nullable();
            $table->dateTime('Fecha_creacion');
            $table->dateTime('Fecha_limite');
            $table->dateTime('Fecha_asignacion');
            $table->dateTime('Fecha_resolución');
            $table->enum('Prioridad', ['Critica', 'Importante', 'Trivial'])->nullable()->default('Trivial');
            $table->enum('Estado', ['ToDo', 'Doing', 'Blocked', 'Done'])->nullable()->default('ToDo');
            
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
