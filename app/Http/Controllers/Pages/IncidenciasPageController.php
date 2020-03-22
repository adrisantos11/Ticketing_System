<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Incidencia;

class IncidenciasPageController extends Controller
{   
    public function getTodasIncidencias() 
    {
        $incidencias = DB::table('incidencias')->get();
        return $incidencias;
    }

    public function getIncidenciasReportedBy(Request $request) 
    {
        $id = $request->only('id');
        $incidenciasReportadas = DB::table('incidencias')->where('id_reporter', $id)->get();
        return $incidenciasReportadas->json();
    }

    public function getIncidenciasAssignedTo(Request $request) 
    {
        $id = $request->only('id');
        $incidenciasAsignadas = DB::table('incidencias')->where('id_assigned', $id)->orderBy('incidencias.priority', 'asc')->orderBy('incidencias.limit_date', 'asc')->get();
        return $incidenciasAsignadas;
    }

    public function getIncidenciasToDo(Request $request)
    {
        $id_user = $request->only('id');
        $incidenciasToDo = DB::table('incidencias')->where('id_assigned', $id_user)->where('state', 'todo')->orderBy('incidencias.priority', 'asc')->orderBy('incidencias.limit_date', 'asc')->get();
        return $incidenciasToDo; 
    }

    public function getIncidenciasDoing(Request $request)
    {
        $id_user = $request->only('id');
        $incidenciasDoing = DB::table('incidencias')->where('id_assigned', $id_user)->where('state', 'doing')->orderBy('incidencias.priority', 'asc')->orderBy('incidencias.limit_date', 'asc')->get();
        return $incidenciasDoing; 
    }

    public function getIncidenciasBlocked(Request $request)
    {
        $id_user = $request->only('id');
        $incidenciasBlocked = DB::table('incidencias')->where('id_assigned', $id_user)->where('state', 'blocked')->orderBy('incidencias.priority', 'asc')->orderBy('incidencias.limit_date', 'asc')->get();
        return $incidenciasBlocked; 
    }

    public function createIncidencia(Request $request) 
    {
        $validator = Validator::make($request->json()->all(), [
            'group_id'          => 'required|numeric|max:255',
            'id_reporter'       => 'required|numeric|max:255',
            'id_assigned'       => 'required|numeric|max:255',
            'title'             => 'required|string',
            'description'       => 'required|string|max:255',
            'department'        => 'string',
            'category'          => 'required|string',
            'build'             => 'required',
            'floor'             => 'required|numeric',
            'class'             => 'required',
            'url_data'          => '',
            'creation_date'     => 'required',
            'limit_date'        => 'required',
            'assigned_date'     => '',
            'resolution_date'   => '',
            'priority'          => 'required|string',
            'state'             => 'required|string',
        ]);

        if($validator->fails())
        {
            return response()->json($validator->errors()->toJson(), 400);
        } else {
            DB::table('incidencias')->insert([
            'group_id'          => $request->group_id,
            'id_reporter'       => $request->id_reporter,
            'id_assigned'       => $request->id_assigned,
            'id_team'           => $request->id_team,
            'title'             => $request->title,
            'description'       => $request->description,
            'category'          => $request->category,
            'build'             => $request->build,
            'floor'             => $request->floor,
            'class'             => $request->class,
            'url_data'          => $request->url_data,
            'creation_date'     => $request->creation_date,
            'limit_date'        => date("Y-m-d H:i:s",$request->limit_date),
            'assigned_date'     => null,
            'resolution_date'   => null,
            'priority'          => $request->priority,
            'state'             => $request->state    
            ]);
        }

    }

    public function deleteIncidencia(Request $request) 
    {
        $id_incidencia = $request->id; 
        DB:table('incidencias')->where('id', $id_incidencia)->delete();
    }

    public function getIncidenciaUnique(Request $request) {
        $id_incidencia = $request->id;
        $incidencia = DB::table('incidencias')->where('id', $id_incidencia)->first();
        return response()->json($incidencia);
    }
}
