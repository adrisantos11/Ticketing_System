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
        
        DB::table('incidencias')->insert([
            'group_id' => 1,
            'id_reporter' => 3,
            'id_assigned' => 5,
            'id_team'=> null,
            'title' => 'Problema software instalado',
            'description' => 'El problema se encuentra en que el ordenador XX no tiene instalado el Software xxxx para que el alumno que lo use pueda seguir la clase al mismo ritmo que todos los demás.',
            'category' => 'Wi-Fi',
            'build' => 'C',
            'floor' => 3,
            'class' => 'C307',
            'url_data' => '',
            'creation_date' => '2014-10-25 20:00:00',
            'limit_date' => '2009-12-30 14:34:29',
            'assigned_date' => null,
            'resolution_date' => null,
            'priority' => 'critical',
            'state' => 'todo'
        ]);

        DB::table('incidencias')->insert([
            'group_id' => 1,
            'id_reporter' => 3,
            'id_assigned' => null,
            'id_team'=> 1,
            'title' => 'Incidencia grupo 1.1',
            'description' => 'Incidencia grupo 1.1',
            'category' => 'Wi-Fi',
            'build' => 'C',
            'floor' => 3,
            'class' => 'C307',
            'url_data' => '',
            'creation_date' => '2014-10-25 20:00:00',
            'limit_date' => '2009-12-30 14:34:29',
            'assigned_date' => null,
            'resolution_date' => null,
            'priority' => 'critical',
            'state' => 'todo'
        ]);

        DB::table('incidencias')->insert([
            'group_id' => 1,
            'id_reporter' => 3,
            'id_assigned' => null,
            'id_team'=> 1,
            'title' => 'Incidencia grupo 1.2',
            'description' => 'Incidencia grupo 1.2',
            'category' => 'Wi-Fi',
            'build' => 'C',
            'floor' => 3,
            'class' => 'C307',
            'url_data' => '',
            'creation_date' => '2014-10-25 20:00:00',
            'limit_date' => '2009-12-30 14:34:29',
            'assigned_date' => null,
            'resolution_date' => null,
            'priority' => 'critical',
            'state' => 'todo'
        ]);

        DB::table('incidencias')->insert([
            'group_id' => 1,
            'id_reporter' => 3,
            'id_assigned' => null,
            'id_team'=> 2,
            'title' => 'Incidencia grupo 2.1',
            'description' => 'Incidencia grupo 2.1',
            'category' => 'Wi-Fi',
            'build' => 'C',
            'floor' => 3,
            'class' => 'C307',
            'url_data' => '',
            'creation_date' => '2014-10-25 20:00:00',
            'limit_date' => '2009-12-30 14:34:29',
            'assigned_date' => null,
            'resolution_date' => null,
            'priority' => 'critical',
            'state' => 'todo'
        ]);

        DB::table('incidencias')->insert([
            'group_id' => 1,
            'id_reporter' => 3,
            'id_assigned' => null,
            'id_team'=> 2,
            'title' => 'Incidencia grupo 2.2',
            'description' => 'Incidencia grupo 2.2',
            'category' => 'Wi-Fi',
            'build' => 'C',
            'floor' => 3,
            'class' => 'C307',
            'url_data' => '',
            'creation_date' => '2014-10-25 20:00:00',
            'limit_date' => '2009-12-30 14:34:29',
            'assigned_date' => null,
            'resolution_date' => null,
            'priority' => 'critical',
            'state' => 'todo'
        ]);

        DB::table('incidencias')->insert([
            'group_id' => 1,
            'id_reporter' => 2,
            'id_assigned' => null,
            'id_team'=> 3,
            'title' => 'Incidencia grupo 3.1',
            'description' => 'Incidencia grupo 3.1',
            'category' => 'Wi-Fi',
            'build' => 'C',
            'floor' => 3,
            'class' => 'C307',
            'url_data' => '',
            'creation_date' => '2014-10-25 20:00:00',
            'limit_date' => '2009-12-30 14:34:29',
            'assigned_date' => null,
            'resolution_date' => null,
            'priority' => 'critical',
            'state' => 'todo'
        ]);

        DB::table('incidencias')->insert([
            'group_id' => 1,
            'id_reporter' => 2,
            'id_assigned' => null,
            'id_team'=> 3,
            'title' => 'Incidencia grupo 3.2',
            'description' => 'Incidencia grupo 3.2',
            'category' => 'Wi-Fi',
            'build' => 'C',
            'floor' => 3,
            'class' => 'C307',
            'url_data' => '',
            'creation_date' => '2014-10-25 20:00:00',
            'limit_date' => '2009-12-30 14:34:29',
            'assigned_date' => null,
            'resolution_date' => null,
            'priority' => 'critical',
            'state' => 'todo'
        ]);

        DB::table('incidencias')->insert([
            'group_id' => 1,
            'id_reporter' => 2,
            'id_assigned' => null,
            'id_team'=> null,
            'title' => 'Prueba de fuego',
            'description' => 'Prueba de fuego',
            'category' => 'Wi-Fi',
            'build' => 'C',
            'floor' => 3,
            'class' => 'C307',
            'url_data' => '',
            'creation_date' => '2014-10-25 20:00:00',
            'limit_date' => null,
            'assigned_date' => null,
            'resolution_date' => null,
            'priority' => 'critical',
            'state' => 'todo'
        ]);

        DB::table('incidencias')->insert([
            'group_id' => 1,
            'id_reporter' => 3,
            'id_assigned' => 5,
            'id_team'=> null,
            'title' => 'Incidencia incidivual 1',
            'description' => 'Incidencia individual',
            'category' => 'Wi-Fi',
            'build' => 'C',
            'floor' => 3,
            'class' => 'C307',
            'url_data' => '',
            'creation_date' => '2020-05-06 12:29:00',
            'limit_date' => null,
            'assigned_date' => null,
            'resolution_date' => null,
            'priority' => 'critical',
            'state' => 'todo'
        ]);
        
        factory(Incidencia::class, 40)->create();

        }
}
