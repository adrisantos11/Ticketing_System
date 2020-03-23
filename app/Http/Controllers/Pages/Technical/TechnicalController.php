<?php

namespace App\Http\Controllers\Pages\Technical;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Incidencia;

class TechnicalController extends Controller
{
    public function getAllTechnicalIncidencias(Request $request, $orderBy) 
    {
        $id_user = $request->id;
        
        $first_union = DB::table('incidencias')->where('id_assigned',$id_user);
        $hole_union = DB::table('incidencias')->select('incidencias.id', 'incidencias.group_id', 'incidencias.id_reporter', 'incidencias.id_assigned', 'incidencias.id_team', 'incidencias.title', 'incidencias.description', 'incidencias.category', 'incidencias.build', 'incidencias.floor', 'incidencias.class', 'incidencias.url_data', 'incidencias.creation_date', 'incidencias.limit_date', 'incidencias.assigned_date', 'incidencias.resolution_date', 'incidencias.priority', 'incidencias.state')->join('team_assigns', 'incidencias.id_team', '=', 'team_assigns.id_team')->join('users', 'team_assigns.id_user', '=', 'users.id')->union($first_union)->orderBy($orderBy, 'asc')->orderBy('limit_date', 'asc')->get();
        
        return $hole_union;
    }

}
