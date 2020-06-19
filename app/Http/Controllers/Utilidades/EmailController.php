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

    public function newCommentMail(Request $request) {
        $id_incidencia = $request->id_incidencia;
        $url = 'http://127.0.0.1:8000/#/home/incidencia-view/'.$id_incidencia.'/comments';
        $data = array('id_incidencia' => $request->id_incidencia, 'incidencia_url' => $url, 'comment'=> $request->comment, 'user_name' => $request->user_name);
        \Mail::send('emails.addComment', $data, function ($message) use ($request){
            $message->to($request->user_emails)->subject('Nuevo comentario en I-'.$request->id_incidencia);
        });
        
        return('OK');
    }

    public function addedToTeamMail(Request $request) {
        $id_incidencia = $request->id_incidencia;
        $url = 'http://127.0.0.1:8000/#/home/incidencia-view/'.$id_incidencia.'/comments';
        $data = array('name_user' => $request->name_user, 'team_name'=> $request->team_name, 'team_description' => $request->team_description, 'supervisor_email' => $request->supervisor_email, 'supervisor_name' => $request->supervisor_name);
        \Mail::send('emails.addToGroup', $data, function ($message) use ($request){
            $message->to($request->user_email)->subject('¡Se te ha añadido a un nuevo equipo!');
        });
        
        return('OK');
    }

    public function assignedToIncidenciaMail(Request $request) {
        $id_incidencia = $request->id_incidencia;
        $url = 'http://127.0.0.1:8000/#/home/incidencia-view/'.$id_incidencia.'/comments';
        $data = array('id_incidencia' => $request->id_incidencia, 'name_user' => $request->name_user, 'incidencia_url'=> $url, 'incidencia_name' => $request->incidencia_name, 'incidencia_description' => $request->incidencia_description, 'incidencia_category' => $request->incidencia_category, 'incidencia_limit_date' => $request->incidencia_limit_date, 'supervisor_name' => $request->supervisor_name, 'team_name' => $request->team_name);
        \Mail::send('emails.assignedToIncidencia', $data, function ($message) use ($request){
            $message->to($request->user_email)->subject('¡Se te ha asignado una incidencia!');
        });
        
        return('OK');
    }
}
