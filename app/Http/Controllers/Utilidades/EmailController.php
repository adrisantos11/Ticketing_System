<?php

namespace App\Http\Controllers\Utilidades;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function sendMail(Request $request) {
        $data = array('date' => '23/09/20', 'technical'=>"Adrián Santos Mena");
        \Mail::send('emails.info', $data, function ($message) {
            $message->to('santos2menaaa@gmail.com');
        });
        
        return('Mensaje enviado correctamente.');
    }
}
