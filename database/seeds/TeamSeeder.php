<?php

use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teams')->insert([
            'description'   => 'Este equipo se hará cargo de las incidencias producidas con el material software de las aulas.',
            'category'      => 'Software',
            'id_supervisor' => 3
        ]);

        DB::table('teams')->insert([
            'description'   => 'Equipo encargado del material hardware de las aulas.',
            'category'      => 'Hardware',
            'id_supervisor' => 3
        ]);

        DB::table('teams')->insert([
            'description'   => 'Equipo encargado de las incidencias producidas en las conexiones y redes de internet.',
            'category'      => 'Redes y conexión wifi',
            'id_supervisor' => 3
        ]);
    }
}
