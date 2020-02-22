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
        Schema::create('users', function (Blueprint $table) {
            $table->bigInteger('ID')->unique()->autoIncrement();
            $table->string('Nombre')->nullable();
            $table->string('Apellido1')->nullable();
            $table->string('Apellido2')->nullable();
            $table->string('Expediente')->nullable();
            $table->string('Constraseña')->nullable();
            $table->string('Email')->nullable();
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
