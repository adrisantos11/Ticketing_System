<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use App\Incidencia;

class SupervisorController extends Controller
{
    function supervisorIncidencias($id_user, $orderDirection, $orderBy) {
        
        /**
         * 1. Se obtienen las incidencias reportadas por el supervisor.
         * 
         * ________________ SQL Query ________________
         *  SELECT * FROM incidencias WHERE incidencias.id_reporter = 3
         */
        $first_union_1    = DB::table('incidencias')->select('incidencias.id', 'incidencias.group_id', 'incidencias.id_reporter', 'incidencias.id_assigned', 'incidencias.id_team', 'incidencias.title', 'incidencias.description', 'incidencias.category', 'incidencias.build', 'incidencias.floor', 'incidencias.class', 'incidencias.url_data', 'incidencias.creation_date', 'incidencias.limit_date', 'incidencias.assigned_date', 'incidencias.resolution_date', 'incidencias.priority', 'incidencias.state')->distinct('incidencia.id')->where('id_reporter',$id_user);

        /**
         * 2. Se obtienen las que están sin asignar.
         * 
         * ________________ SQL Query ________________
         * SELECT * FROM incidencias WHERE id_assigned is NULL and id_team is NULL
         */
        $second_union_1   = DB::table('incidencias')->select('incidencias.id', 'incidencias.group_id', 'incidencias.id_reporter', 'incidencias.id_assigned', 'incidencias.id_team', 'incidencias.title', 'incidencias.description', 'incidencias.category', 'incidencias.build', 'incidencias.floor', 'incidencias.class', 'incidencias.url_data', 'incidencias.creation_date', 'incidencias.limit_date', 'incidencias.assigned_date', 'incidencias.resolution_date', 'incidencias.priority', 'incidencias.state')->distinct('incidencia.id')->whereNull('id_assigned')->whereNull('id_team');

        $third_union_1 = DB::table('incidencias')->select('incidencias.id', 'incidencias.group_id', 'incidencias.id_reporter', 'incidencias.id_assigned', 'incidencias.id_team', 'incidencias.title', 'incidencias.description', 'incidencias.category', 'incidencias.build', 'incidencias.floor', 'incidencias.class', 'incidencias.url_data', 'incidencias.creation_date', 'incidencias.limit_date', 'incidencias.assigned_date', 'incidencias.resolution_date', 'incidencias.priority', 'incidencias.state')->distinct('incidencia.id')->where('supervisor', $id_user);
        /**
         *  3. Se obtienen las incidencias que están dentro de los grupos asociados al supervisor.
         * 
         * ________________ SQL Query ________________
         *  SELECT * from incidencias INNER JOIN teams ON incidencias.id_team = teams.id WHERE teams.id_supervisor = 3
         */
        $hole_union     = DB::table('incidencias')->select('incidencias.id', 'incidencias.group_id', 'incidencias.id_reporter', 'incidencias.id_assigned', 'incidencias.id_team', 'incidencias.title', 'incidencias.description', 'incidencias.category', 'incidencias.build', 'incidencias.floor', 'incidencias.class', 'incidencias.url_data', 'incidencias.creation_date', 'incidencias.limit_date', 'incidencias.assigned_date', 'incidencias.resolution_date', 'incidencias.priority', 'incidencias.state')->distinct('incidencia.id')->join('teams', 'incidencias.id_team', '=', 'teams.id')->where('teams.id_supervisor',$id_user)->union($first_union_1)->union($second_union_1)->union($third_union_1)->orderBy($orderBy, $orderDirection)->orderBy('limit_date', 'asc');

        return $hole_union;
    }

    public function getSupervisorIncidencias(Request $request, $orderBy) {
        $id_user = $request->id;
        $orderByDirection = 'asc';

        // En el caso en el que sea por estado, ordenarlo en modo descendente.
        if ($orderBy == 'state') {
            $orderByDirection = 'desc';
        }
        if ($orderBy == 'no_assigned') {
            return DB::table('incidencias')->whereNull('id_assigned')->whereNull('id_team')->get();
        } else  {

            $hole_union = $this->supervisorIncidencias($id_user, $orderByDirection, $orderBy)->get();
            
            /**
             * Ejemplo con 'state': 
             * ________________ SQL Query ________________
             * select DISTINCT incidencias.id, incidencias.category FROM incidencias WHERE incidencias.id_reporter = 3 ORDER BY `id` ASC
             * [
                    {
                        "value": "todo",
                        "count": 3
                    },
                    {
                        "value": "doing",
                        "count": 4
                    },
                    {
                        "value": "blocked",
                        "count": 2
                    }
                ]
             */
            $first_union_2    = DB::table('incidencias')->select(DB::raw('incidencias.id as ID'), DB::raw('incidencias.'.$orderBy . ' as orderBy'))->distinct('ID')->where('id_reporter',$id_user);

            /**
             * Ejemplo con 'state':
             * 
             * ________________ SQL Query ________________
             * select DISTINCT incidencias.id, incidencias.category from incidencias where incidencias.id_assigned IS NULL and incidencias.id_team IS null ORDER by id
             * [
                    {
                        "value": "todo",
                        "count": 4
                    },
                    {
                        "value": "doing",
                        "count": 2
                    },
                    {
                        "value": "blocked",
                        "count": 4
                    },
                    {
                        "value": "done",
                        "count": 2
                    }
                ]
             */
            $second_union_2   = DB::table('incidencias')->select(DB::raw('incidencias.id as ID'), DB::raw('incidencias.'.$orderBy . ' as orderBy'))->distinct('ID')->whereNull('id_assigned')->whereNull('id_team');
            
            /**
             * Ejemplo con 'state':
             *  SELECT DISTINCT incidencias.id, incidencias.category from incidencias
                inner JOIN teams on incidencias.id_team = teams.id
                where teams.id_supervisor = 3
             * [
                    {
                        "value": "todo",
                        "count": 4
                    }
                ]
             */

            $count_query    = DB::table('incidencias')->select(DB::raw('incidencias.id as ID'), DB::raw('incidencias.'.$orderBy . ' as orderBy'))->distinct('ID')->join('teams', 'incidencias.id_team', '=', 'teams.id')->where('teams.id_supervisor',$id_user)->union($first_union_2)->union($second_union_2);

            $main_count_query = DB::table(DB::raw("({$count_query->toSql()}) as ListFilters "))->mergeBindings($count_query)->select(DB::raw('ListFilters.orderBy as value'), DB::raw('COUNT(ListFilters.orderBy) as count'))->groupBy('ListFilters.orderBy')->orderBy('orderBy', $orderByDirection)->get();

            $colour_list = array();
            if ($orderBy == 'priority') {
                array_push($colour_list, 'red', 'orange', 'green');
            } else if ($orderBy == 'category') {
                array_push($colour_list, 'primary', 'primary', 'primary', 'primary', 'primary', 'primary');
            } else if($orderBy == 'state') {
                array_push($colour_list, 'primary', 'green', 'orange', 'red');
            }
            $data_json = array('data' => $hole_union, 'sizes' => $main_count_query, 'colors' => $colour_list);
            return json_encode($data_json);
        }
    }


    public function getFilteredIncidencias(Request $request)
    {
        $userId = $request->userId;
        $idDropdown = $request->idDropdown;
        $idSelectedBoxList = $request->idSelectboxList;
        $orderByDirection = 'asc';

        if ($idDropdown == 'state') {
            $orderByDirection = 'desc';
        }
        $filterBy;
        $filterList = array();
        $index = 0;
        $where_raw = '';

        foreach($idSelectedBoxList as $valor) { 
            preg_match('/^.*?(?=_)/', $valor, $match);
            array_push($filterList, $match[0]);
            if($index == 0) {
                $where_raw = $where_raw.'IncidenciasList.'.$idDropdown.'="'.$match[0].'"';
            } else {
                $where_raw = $where_raw.'OR IncidenciasList.'.$idDropdown.'="'.$match[0].'"';
            }
            $index = $index +1;
        }


        $hole_union = $this->supervisorIncidencias($userId, $orderByDirection, $idDropdown);

        $filtered_query = DB::table(DB::raw("({$hole_union->toSql()}) as IncidenciasList "))->mergeBindings($hole_union)->whereRaw($where_raw)->get();
        return $filtered_query;
    }

    public function getWithoutAssignIncidencias() {
        $incidencias   = DB::table('incidencias')->distinct('incidencia.id')->whereNull('id_assigned')->whereNull('id_team')->get();
        return $incidencias; 
    }


    /**
     * SELECT * FROM teams WHERE id_supervisor = 3
     */
    public function getTechnicalGroups(Request $request) {
       $id_supervisor = $request->id;

       $groups = DB::table('teams')->where('id_supervisor', $id_supervisor)->get();
       return $groups;
    }


    /**
     * SELECT * from users 
inner JOIN team_assigns on users.id = team_assigns.id_user
inner JOIN teams on team_assigns.id_team = teams.id
where teams.id = 1
     */
    public function getGroupUsers(Request $request) {
        $id_group = $request->id;
        $group_users = DB::table('users')->select('users.id','users.name','users.surname1','users.surname2', 'users.role')->join('team_assigns', 'users.id', '=', 'team_assigns.id_user')->join('teams', 'team_assigns.id_team', '=', 'teams.id')->where('teams.id', $id_group)->get();

        return $group_users;
    }

    public function deleteTechnicalAssign(Request $request) {
        $technical_id = $request->userId;
        $team_id = $request->teamId;

        DB::delete('delete from team_assigns where team_assigns.id_user = ? and team_assigns.id_team = ?', [$technical_id, $team_id]);

    }

    public function addTechnicalToGroup(Request $request) {
        $id_user = $request->userId;
        $id_team = $request->teamId;

        DB::insert('insert into team_assigns (id_user, id_team) values (?, ?)', [$id_user, $id_team]);
    }

    public function createTechnicalTeam(Request $request) {
        $validator = Validator::make($request->json()->all(), [
            'name'          => 'required',
            'description'   => 'required',
            'category'      => 'required',
            'idSupervisor'  => 'required'
        ]);

        if($validator->fails())
        {
            return response()->json($validator->errors()->toJson(), 400);
        } else {
            DB::table('teams')->insert([
                'name'          => $request->name,
                'description'   => $request->description,
                'category'      => $request->category,
                'id_supervisor' => $request->idSupervisor
            ]);
        }

    }

    public function getGroupCategories(){
        $categories = DB::table('teams')->select('category')->distinct('category')->get();
        $categories_array = [];
        for ($i=0; $i < sizeof($categories); $i++) { 
            array_push($categories_array, $categories[$i]->category);
        }
        return $categories_array;
    }

    /**
     * SELECT users.email FROM `users`
        INNER JOIN team_assigns on team_assigns.id_user = users.id
        INNER JOIN teams on teams.id = team_assigns.id_team
        WHERE teams.id = 2
     */
    public function getGroupEmails(Request $request) {
        $id_team = $request->id;
        $emails = DB::table('users')->select('users.email')->distinct('users.email')->join('team_assigns', 'team_assigns.id_user', '=', 'users.id')->join('teams', 'teams.id', '=', 'team_assigns.id_team')->where('teams.id', $id_team)->get();
        return $emails;
    }
}
