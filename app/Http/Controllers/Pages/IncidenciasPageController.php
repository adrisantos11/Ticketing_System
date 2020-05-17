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
            'group_id'          => 'required',
            'id_reporter'       => 'required',
            'id_assigned'       => '',
            'id_team'           => '',
            'supervisor'        => '',
            'title'             => 'required|string',
            'description'       => 'required|string',
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
            'supervisor'        => $request->supervisor,
            'title'             => $request->title,
            'description'       => $request->description,
            'category'          => $request->category,
            'build'             => $request->build,
            'floor'             => $request->floor,
            'class'             => $request->class,
            'url_data'          => $request->url_data,
            'creation_date'     => $request->creation_date,
            'limit_date'        => date("Y-m-d H:i:s",$request->limit_date),
            'assigned_date'     => $request->assigned_date,
            'resolution_date'   => $request->resolution_date,
            'priority'          => $request->priority,
            'state'             => $request->state    
            ]);
        }
    }

    public function deleteIncidencia(Request $request) 
    {
        $id_incidencia = $request->id; 
        DB::table('incidencias')->where('id', $id_incidencia)->delete();
    }

    public function editIncidencia(Request $request) {
        $id_incidencia = $request->id;
        DB::table('incidencias')->where('id', $id_incidencia)
            ->update([
                'id_assigned' => $request->id_assigned,
                'id_team' => $request->id_team,
                'title' => $request->title,
                'description' => $request->description,
                'category' => $request->category,
                'build' => $request->build,
                'floor' => $request->floor,
                'class' => $request->class,
                'url_data' => $request->url_data,
                'limit_date'=> date("Y-m-d H:i:s",$request->limit_date),
                'assigned_date'     => $request->assigned_date,
                'resolution_date'   => $request->resolution_date,    
                'priority'=> $request->priority,
                'state' => $request->state
            ]);
    }

    public function removeIncidencia(Request $request) {
        $id_incidencia = $request->id;
        DB::delete('delete from incidencias where incidencias.id = ?', [$id_incidencia]);
    }

    public function getAssignedNamesIncidencia($id_reporter, $id_assigned, $supervisor_id, $id_team){
        $reporter = null;
        $supervisor = null;
        $assigned = null;
        $group = null;

        if ($id_reporter != null) {
            $reporter = DB::table('users')->distinct('users.id')->where('users.id', $id_reporter)->get();
            // $name_reporter = $name_reporter[0]->name.' '.$name_reporter[0]->surname1.' '.$name_reporter[0]->surname2;
        }

        if ($id_assigned != null) {
            $assigned = DB::table('users')->distinct('users.id')->where('users.id', $id_assigned)->get();
            // $name_assigned = $name_assigned[0]->name.' '.$name_assigned[0]->surname1.' '.$name_assigned[0]->surname2;
        }

        if ($supervisor_id != null) {
            $supervisor = DB::table('users')->distinct('users.id')->where('users.id', $supervisor_id)->get();
            // $name_assigned = $name_assigned[0]->name.' '.$name_assigned[0]->surname1.' '.$name_assigned[0]->surname2;
        }

        if ($id_team != null) {
            $group = DB::table('teams')->distinct('teams.id')->where('teams.id', $id_team)->get();
            // $name_group = $name_group[0]->name;
        }
        $data_json = array('reporter' => $reporter[0], 'assigned' => $assigned[0],'supervisor' => $supervisor[0], 'group' => $group[0]);
        json_encode($data_json);

        return $data_json; 
    }

    public function getIncidenciaUnique(Request $request) {
        $id_incidencia = $request->id;
        $incidencia = DB::table('incidencias')->distinct('incidencia.id')->where('id', $id_incidencia)->get();
        $moreData = $this->getAssignedNamesIncidencia($incidencia[0]->id_reporter, $incidencia[0]->id_assigned, $incidencia[0]->supervisor, $incidencia[0]->id_team);

        $data_json = array('incidencia' => $incidencia, 'moreData' => $moreData);
        json_encode($data_json);
        return $data_json;
    }


    public function updateStateIncidencia(Request $request) {
        $id_incidencia = $request->id;
        $resolution_date = $request->resolutionDate;
        $state = $request->newState;
        if ($resolution_date != '' && $state=='done') {
            DB::table('incidencias')->where('id', $id_incidencia)
            ->update([
                'state' => $state,
                'resolution_date' => $resolution_date
            ]);
        } else {
            DB::table('incidencias')->where('id', $id_incidencia)
                ->update([
                    'state' => $state,
                    'resolution_date' => $resolution_date
                ]);
        }
        return $resolution_date;
    }

    /**
     *  SELECT comments.*, users.name, users.surname1, users.surname2, users.role, users.image_url
        from comments
        INNER JOIN users ON comments.user_id = users.id
        WHERE comments.incidencia_id = 8
        ORDER BY comments.id
     */
    public function getComments(Request $request) {
        $id_incidencia = $request->idIncidencia;
        $comments = DB::table('comments')->select(DB::raw('comments.*, users.name as user_name, users.surname1 as user_surname1, users.surname2 as user_surname2, users.role as user_role, users.image_url as user_imageURL'))->join('users', 'comments.user_id', '=', 'users.id')->where('comments.incidencia_id', $id_incidencia)->orderBy('comments.id', 'desc')->get();

        return $comments;
    }

    public function createIncidenciaComment(Request $request) 
    {
        $validator = Validator::make($request->json()->all(), [
            'incidenciaId'  => 'required|numeric',
            'userId'        => 'required|numeric',
            'text'          => 'required|string',
            'date'          => 'required|string',
        ]);

        if($validator->fails())
        {
            return response()->json($validator->errors()->toJson(), 400);
        } else {
            DB::table('comments')->insert([
            'incidencia_id' => $request->incidenciaId,
            'user_id'       => $request->userId,
            'text'          => $request->text,
            'sent_Date'     => $request->date,
            'url_data'      => $request->urlData,
            ]);
        }

    }

}
