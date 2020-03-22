<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Incidencia;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Incidencia::class, function (Faker $faker) {
    $randomDate1 = mt_rand(1262055681,1263645342);
    $randomDateCasted1 = date("Y-m-d H:i:s", $randomDate1);

    $randomDate2 = mt_rand(1262055681,1263645342);
    $randomDateCasted2 = date("Y-m-d H:i:s", $randomDate2);

    $randomDate3 = mt_rand(1262055681,1263645342);
    $randomDateCasted3 = date("Y-m-d H:i:s", $randomDate3);

    $randomDate4 = mt_rand(1262055681,1263645342);
    $randomDateCasted4 = date("Y-m-d H:i:s", $randomDate4);

    $categories = array("Mobiliario", "Wi-Fi", "Red", "Switch", "Hardware", "Software");
    $category = array_rand($categories, 1);

    $priorities = array("critical", "important", "trivial");
    $priority = array_rand($priorities, 1);

    $states = array("todo", "doing", "blocked", "done");
    $state = array_rand($states, 1);

    return [
        "group_id" => mt_rand(1,3),
        "id_reporter" => mt_rand(1,4),
        "id_assigned" => mt_rand(1,4),
        "id_team" => null,
        "title" => Str::random(10),
        "description" => Str::random(30),
        "category" => $categories[$category],
        "build" => "C",
        "floor" => 3,
        "class" => "C307",
        "url_data" => "",
        "creation_date" => $randomDateCasted1,
        "limit_date" => $randomDateCasted2,
        "assigned_date" => $randomDateCasted3,
        "resolution_date" => $randomDateCasted4,
        "priority" => $priorities[$priority],
        "state" => $states[$state]
    ];
});
