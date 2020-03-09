<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Incidencia;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Incidencia::class, function (Faker $faker) {
    $randomDate1 = mt_rand(1262055681,1262055681);
    $randomDateCasted1 = date("Y-m-d H:i:s", $randomDate1);

    $randomDate2 = mt_rand(1262055681,1262055681);
    $randomDateCasted2 = date("Y-m-d H:i:s", $randomDate2);

    $randomDate3 = mt_rand(1262055681,1262055681);
    $randomDateCasted3 = date("Y-m-d H:i:s", $randomDate3);

    $randomDate4 = mt_rand(1262055681,1262055681);
    $randomDateCasted4 = date("Y-m-d H:i:s", $randomDate4);
    return [
        'group_id' => mt_rand(1,3),
        'id_reporter' => mt_rand(1,4),
        'id_assigned' => mt_rand(1,4),
        'title' => Str::random(10),
        'description' => Str::random(30),
        'department' => 'TIC',
        'build' => 'C',
        'floor' => 3,
        'class' => 'C307',
        'url_data' => '',
        'creation_date' => $randomDateCasted1,
        'limit_date' => $randomDateCasted2,
        'assigned_date' => $randomDateCasted3,
        'resolution_date' => $randomDateCasted4,
        'priority' => 'trivial',
        'state' => 'todo'
    ];
});
