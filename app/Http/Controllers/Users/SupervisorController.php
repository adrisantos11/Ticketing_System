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
            
            $raw = $orderBy.' AS value';
            $count_query    = DB::table('incidencias')->select(DB::raw($raw), DB::raw('count(*) AS count'))->groupBy($orderBy)->get();
            $colour_list = array();
            if ($orderBy == 'priority') {
                array_push($colour_list, 'red', 'orange', 'green');
            } else if ($orderBy == 'category') {
                array_push($colour_list, 'primary', 'primary', 'primary', 'primary', 'primary', 'primary');
            } else if($orderBy == 'state') {
                array_push($colour_list, 'primary', 'orange', 'red', 'green');
            }
            $data_json = array('data' => $hole_union, 'sizes' => $count_query, 'colors' => $colour_list);
            return json_encode($data_json);
        }
    }

    public function getFilteredIncidencias(Request $request)
    {
        $userId = $request->userId;
        $idDropdown = $request->idDropdown;
        $idSelectedBoxList = $request->idSelectboxList;

        if ($idDropdown == 'state') {
            $orderByDirection = 'desc';
        }
        $filterBy;
        $filterList = array();
        foreach($idSelectedBoxList as $valor) { 
            preg_match('/^.*?(?=_)/', $valor, $match);
            array_push($filterList, $match[0]);
        }
        
        $first_union    = DB::table('incidencias')->where('id_reporter',$userId)->where(function($query) use ($filterList, $idDropdown) {
            foreach($filterList as $valor) {
                $query->orWhere($idDropdown, $valor);
            }
        });
        $second_union   = DB::table('incidencias')->whereNull('id_assigned')->whereNull('id_team')->where(function($query) use ($filterList, $idDropdown) {
            foreach($filterList as $valor) {
                $query->orWhere($idDropdown, $valor);
            }
        });
        $hole_union     = DB::table('incidencias')->select('incidencias.id', 'incidencias.group_id', 'incidencias.id_reporter', 'incidencias.id_assigned', 'incidencias.id_team', 'incidencias.title', 'incidencias.description', 'incidencias.category', 'incidencias.build', 'incidencias.floor', 'incidencias.class', 'incidencias.url_data', 'incidencias.creation_date', 'incidencias.limit_date', 'incidencias.assigned_date', 'incidencias.resolution_date', 'incidencias.priority', 'incidencias.state')->join('team_assigns', 'incidencias.id_team', '=', 'team_assigns.id_team')->where('id_reporter',$userId)->where(function($query) use ($filterList, $idDropdown) {
            foreach($filterList as $valor) {
                $query->orWhere($idDropdown, $valor);
            }
        })->union($first_union)->union($second_union)->orderBy($idDropdown, 'asc')->orderBy('limit_date', 'asc')->get();  
        return $hole_union;
    }
}
