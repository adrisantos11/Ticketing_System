<?php

use Illuminate\Database\Seeder;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('comments')->insert([
            'incidencia_id' => 8,
            'user_id'       => 2,
            'text'          => 'La incidencia ha sido abierta porque se consideraba de mucha importancia.',
            'sent_date'     => '2020-04-25 20:45:13',
            'url_data'      => ''
        ]);

        DB::table('comments')->insert([
            'incidencia_id' => 8,
            'user_id'       => 3,
            'text'          => '¿Podríais explicar mejor en qué consiste la incidencia?',
            'sent_date'     => '2020-04-26 13:45:19',
            'url_data'      => ''
        ]);

        DB::table('comments')->insert([
            'incidencia_id' => 8,
            'user_id'       => 2,
            'text'          => 'Claro, sin problema, ya le aviso al usuario 5 luego y os lo explica.',
            'sent_date'     => '2020-04-26 17:23:32',
            'url_data'      => ''
        ]);

        DB::table('comments')->insert([
            'incidencia_id' => 8,
            'user_id'       => 5,
            'text'          => 'Hola buenas, ya se habló con el responsable de la incidencia y está todo solucionado. Un saludo!!',
            'sent_date'     => '2020-04-27 09:10:23',
            'url_data'      => ''
        ]);
    }
}
