<?php

namespace App\Http\Controllers\Utilidades;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\User;

class AutocompleteController extends Controller
{

    /**
     *  SELECT *
        FROM users
        WHERE users.name LIKE '%San%' || users.surname1 LIKE '%San%' || users.surname2 LIKE '%san%'
     */
    public function filterUsers(Request $request) {
        $data = $request->data;
        $query = DB::table('users')->where('users.name', 'LIKE', '%'.$data.'%')->orWhere('users.surname1', 'LIKE', '%'.$data.'%')->orWhere('users.surname2', 'LIKE', '%'.$data.'%')->get();
        $json_array = array();
        foreach($query as $value) {
            $object =  array("id"=> $value->id, "name" => $value->name, "surname1" => $value->surname1, "surname2" => $value->surname2);
            array_push($json_array, $object);
        }
        return json_encode($json_array);
    }
}
