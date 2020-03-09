<?php

namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Incidencia;

class IncidenciasPageController extends Controller
{
    public function getTodasIncidencias() {
        $incidencias = Incidencia::all();
        foreach ($incidencias as $incidencia) {
            echo($incidencia->title);
        }
    }

    public function getIncidenciasUsuario($expediente) {
        
    }
}
