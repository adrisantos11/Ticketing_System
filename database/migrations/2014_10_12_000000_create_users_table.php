<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->bigInteger('ID')->unique()->autoIncrement();
            $table->string('Nombre');
            $table->string('Apellido1');
            $table->string('Apellido2');
            $table->string('Expediente');
            $table->string('Constraseña');
            $table->string('Email');
            $table->string('Telefono')->nullable();
            $table->enum('Rol', ['Administrador', 'Supervisor', 'Tecnico'])->default('Tecnico');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
