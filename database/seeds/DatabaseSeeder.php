<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsuariosTableSeeder::class,
            IncidenciasSeeder::class,
            TeamSeeder::class,
            TeamAssignsSeeder::class,
            CommentsSeeder::class,
            IncidenciaLogsSeeder::class
        ]);
    }
}
