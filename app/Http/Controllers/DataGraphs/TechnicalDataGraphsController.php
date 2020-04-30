<?php

namespace App\Http\Controllers\DataGraphs;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Incidencia;

class TechnicalDataGraphsController extends Controller
{
    /**
     *  SELECT incidencias.state, COUNT(*)
        FROM incidencias
        WHERE incidencias.id_assigned = 4
        GROUP BY incidencias.state
     */
    public function getTotal(Request $request) {
        $id_user = $request->idUser;
        $total_incidencias = DB::table('incidencias')->select(DB::raw('incidencias.state, COUNT(*) as total'))->distinct('incidencias.id')->where('id_assigned',$id_user)->groupBy('incidencias.state')->get();
        
        return $total_incidencias;
    }
}
