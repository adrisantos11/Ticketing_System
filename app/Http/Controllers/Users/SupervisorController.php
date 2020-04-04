<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Incidencia;

class SupervisorController extends Controller
{
    /**
     * ------------ Incidencias pertenencientes a los equipos asignados al supervisor ------------
     * SELECT incidencias.title, incidencias.description, incidencias.state FROM incidencias
        inner join team_assigns on incidencias.id_team = team_assigns.id_team
        where team_assigns.id_user = 3
        order by incidencias.state

        ------------ Incidencias reportadas por el técnico ------------------------
        SELECT incidencias.title, incidencias.description, incidencias.state FROM incidencias
        where incidencias.id_reporter = 3
        order by incidencias.state

        ------------ Incidencias sin asignar ------------
        SELECT * from incidencias
        WHERE incidencias.id_assigned IS NULL && incidencias.id_team IS NULL
     */
    public function getSupervisorIncidencias(Request $request, $orderBy) 
    {
        $id_user = $request->id;
        $orderByDirection = 'asc';
        
        // En el caso en el que sea por estado, ordenarlo en modo descendente.
        if ($orderBy == 'state') {
            $orderByDirection = 'desc';
        }
        if ($orderBy == 'no_assigned') {
            return DB::table('incidencias')->whereNull('id_assigned')->whereNull('id_team')->get();
        } else  {
            $first_union    = DB::table('incidencias')->where('id_reporter',$id_user);
            $second_union   = DB::table('incidencias')->whereNull('id_assigned')->whereNull('id_team');
            $hole_union     = DB::table('incidencias')->select('incidencias.id', 'incidencias.group_id', 'incidencias.id_reporter', 'incidencias.id_assigned', 'incidencias.id_team', 'incidencias.title', 'incidencias.description', 'incidencias.category', 'incidencias.build', 'incidencias.floor', 'incidencias.class', 'incidencias.url_data', 'incidencias.creation_date', 'incidencias.limit_date', 'incidencias.assigned_date', 'incidencias.resolution_date', 'incidencias.priority', 'incidencias.state')->join('team_assigns', 'incidencias.id_team', '=', 'team_assigns.id_team')->where('id_reporter',$id_user)->union($first_union)->union($second_union)->orderBy($orderBy, $orderByDirection)->orderBy('limit_date', 'asc')->get();
            
            return $hole_union;
        }
    }
}
