<?php

namespace App\Http\Controllers\Utilidades;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function incidenciaStateChangedMail(Request $request) {
        $id_incidencia = $request->id_incidencia;
        $url = 'http://127.0.0.1:8000/#/home/incidencia-view/'.$id_incidencia.'/comments';
        $data = array('id_incidencia' => $request->id_incidencia, 'state'=>$request->state, 'color' => $request->color, 'incidencia_url' => $url);
        \Mail::send('emails.changeState', $data, function ($message) use ($request){
            $message->to($request->user_emails)->subject('Cambio estado I-'.$request->id_incidencia);
        });
        
        return('OK');
    }
}
