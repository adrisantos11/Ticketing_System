<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Incidencia;
use Faker\Generator as Faker;
use Illuminate\Support\Str;


$factory->define(Incidencia::class, function (Faker $faker) {
    $start = strtotime("3 March 2020");

    $randomDate1 = mt_rand($start,time());
    $randomDateCasted1 = date("Y-m-d H:i:s", $randomDate1);

    $randomDate2 = mt_rand($randomDate1,time());
    $randomDateCasted2 = date("Y-m-d H:i:s", $randomDate2);

    $ids_reporter = array(2,3,4,5,6,7,8);
    $id_reporter = array_rand($ids_reporter, 1);
    $supervisor = null;
    
    if ($ids_reporter[$id_reporter] == 2 || $ids_reporter[$id_reporter] == 3) {
        $supervisor = $ids_reporter[$id_reporter];
    }

    $ids_assigned = array(3,4,5,6, null);
    $id_assigned = array_rand($ids_assigned, 1);

    while ($ids_reporter[$id_reporter] == $ids_assigned[$id_assigned]) {
        $id_assigned = array_rand($ids_assigned, 1);
    }

    $categories = array("Mobiliario", "Wi-Fi", "Red", "Switch", "Hardware", "Software");
    $category = array_rand($categories, 1);

    $priorities = array("critical", "important", "trivial");
    $priority = array_rand($priorities, 1);

    $states = array("todo", "doing", "blocked", "done");
    $state = array_rand($states, 1);

    return [
        "group_id" => mt_rand(1,3),
        "id_reporter" => $ids_reporter[$id_reporter],
        "id_assigned" => $ids_assigned[$id_assigned],
        "id_team" => null,
        "supervisor"=> $supervisor,
        "title" => Str::random(10),
        "description" => Str::random(30),
        "category" => $categories[$category],
        "build" => "C",
        "floor" => 3,
        "class" => "C307",
        "url_data" => "",
        "creation_date" => $randomDateCasted1,
        "limit_date" => $randomDateCasted2,
        "assigned_date" => null,
        "resolution_date" => null,
        "priority" => $priorities[$priority],
        "state" => $states[$state]
    ];
});
