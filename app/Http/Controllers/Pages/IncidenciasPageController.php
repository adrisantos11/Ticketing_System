<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            'name'      => 'required|string|max:255',
            'surname1'  => 'required|string|max:255',
            'surname2'  => 'required|string|max:255',
            'exp'       => 'required|numeric|unique:users',
            'email'     => 'required|string|email|max:255|unique:users',
            'password'  => 'string|min:4',
            'phone'     => 'required|numeric',
            'role'      => 'required',
        ]);
    }

    public function deleteIncidencia(Request $request) 
    {
        $id_incidencia = $request->only('id'); 
        DB:table('incidencias')->where('id', $id_incidencia)->delete();
    }
}
