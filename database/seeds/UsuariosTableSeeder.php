<?php

use Illuminate\Database\Seeder;

class UsuariosTableSeeder extends Seeder
{
       /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Adrián',
            'surname1' => 'Santos',
            'surname2' => 'Mena',
            'exp' => '21619919',
            'password' => '1234',
            'email' => 'santos2menaaa@gmail.com',
            'phone' => '608650958'
        ]);
        DB::table('users')->insert([
            'name' => 'Javier',
            'surname1' => 'Cai',
            'surname2' => 'Lin',
            'exp' => '24323323',
            'password' => '4321',
            'email' => 'jcl4332@gmail.com',
            'phone' => '654345645'
        ]);
    }
}
