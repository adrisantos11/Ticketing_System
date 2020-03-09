<?php

use Illuminate\Database\Seeder;
use App\Incidencia; 
class IncidenciasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Incidencia::class, 15)->create();

        DB::table('incidencias')->insert([
            'group_id' => 1,
            'id_reporter' => 2,
            'id_assigned' => 3,
            'title' => 'Problema software instalado',
            'description' => 'El problema se encuentra en que el ordenador XX no tiene instalado el Software xxxx para que el alumno que lo use pueda seguir la clase al mismo ritmo que todos los demás.',
            'department' => 'TIC',
            'build' => 'C',
            'floor' => 3,
            'class' => 'C307',
            'url_data' => '',
            'creation_date' => '2014-10-25 20:00:00',
            'limit_date' => '2014-10-25 20:00:00',
            'assigned_date' => '2014-10-25 20:00:00',
            'resolution_date' => '2014-10-25 20:00:00',
            'priority' => 'trivial',
            'state' => 'todo'
        ]);
    }
}
