<?php

namespace App\Http\Controllers\Incidencias;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Incidencia;

class IncidenciaLogsController extends Controller
{

    public function saveStateLogIncidencia(Request $request) {
        $validator = Validator::make($request->json()->all(), [
            'incidenciaId'  => 'required|numeric',
            'userId'        => 'required|numeric',
            'state'         => 'required',
            'comment'       => 'string',
            'date'          => 'required|string'
        ]);

        if($validator->fails())
        {
            return response()->json($validator->errors()->toJson(), 400);
        } else {
            DB::table('incidencia_logs')->insert([
            'incidencia_id' =>  $request->incidenciaId,
            'user_id'       =>  $request->userId,
            'state'         =>  $request->state,
            'comment'       =>  $request->comment,
            'date'          =>  $request->date,
            'action'        =>  $request->action
            ]); 
        }

    }

    function getLastIncidenciaID() {
        $id = DB::table('incidencias')->where('id', \DB::raw("(select max(`id`) from incidencias)"))->get();
        return $id[0]->id;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
    }
}
