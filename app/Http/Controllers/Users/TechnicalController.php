<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Incidencia;

class TechnicalController extends Controller
{

    public function tecnichalIncidencias($id_user, $orderDirection, $orderBy) {
        /**
         * Incidencias asignadas al técnico.
         */
        $first_union = DB::table('incidencias')->distinct('incidencias.id')->where('id_assigned',$id_user);
        /**
         * Incidencias asignadas a los grupos a los que pertenece el técnico.
         */
        $hole_union = DB::table('incidencias')->select('incidencias.id', 'incidencias.group_id', 'incidencias.id_reporter', 'incidencias.id_assigned', 'incidencias.id_team', 'incidencias.title', 'incidencias.description', 'incidencias.category', 'incidencias.build', 'incidencias.floor', 'incidencias.class', 'incidencias.url_data', 'incidencias.creation_date', 'incidencias.limit_date', 'incidencias.assigned_date', 'incidencias.resolution_date', 'incidencias.priority', 'incidencias.state')->distinct('incidencias.id')->join('team_assigns', 'incidencias.id_team', '=', 'team_assigns.id_team')->where('team_assigns.id_user', $id_user)->union($first_union)->orderBy($orderBy, $orderDirection)->orderBy('limit_date', 'asc')->get();
        
        return $hole_union;
    }

    public function getTechnicalIncidencias(Request $request, $orderBy) 
    {
        $id_user = $request->id;
        $orderByDirection = 'asc';

        // En el caso en el que sea por estado, ordenarlo en modo descendente.
        if ($orderBy == 'state') {
            $orderByDirection = 'desc';
        }
        
        $incidencias = $this->tecnichalIncidencias($id_user, $orderByDirection, $orderBy);

        $first_union    = DB::table('incidencias')->select(DB::raw('incidencias.id as ID'), DB::raw('incidencias.'.$orderBy . ' as orderBy'))->distinct('ID')->where('incidencias.id_assigned',$id_user);

        $second_union = DB::table('incidencias')->select(DB::raw('incidencias.id as ID'), DB::raw('incidencias.'.$orderBy . ' as orderBy'))->distinct('ID')->join('team_assigns', 'incidencias.id_team', '=', 'team_assigns.id_team')->where('team_assigns.id_user', $id_user)->union($first_union);

        $main_count_query = DB::table(DB::raw("({$second_union->toSql()}) as ListFilters "))->mergeBindings($second_union)->select(DB::raw('ListFilters.orderBy as value'), DB::raw('COUNT(ListFilters.orderBy) as count'))->groupBy('ListFilters.orderBy')->orderBy('orderBy', $orderByDirection)->get();

        $colour_list = array();

        if ($orderBy == 'priority') {
            array_push($colour_list, 'red', 'orange', 'green');
        } else if ($orderBy == 'category') {
            array_push($colour_list, 'primary', 'primary', 'primary', 'primary', 'primary', 'primary');
        } else if($orderBy == 'state') {
            array_push($colour_list, 'primary', 'green', 'orange', 'red');
        }

        $data_json = array('data' => $incidencias,'sizes' => $main_count_query, 'colors' => $colour_list);
        return json_encode($data_json);        
    }

}
