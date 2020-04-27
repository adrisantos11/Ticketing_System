<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::get('home', 'UserController@getAuthenticatedUser');
Route::post('logout', 'UserController@logout');
Route::post('getUser', 'UserController@getUserLogged');

Route::namespace('Pages')->group(function () {
    Route::get('incidencias', 'IncidenciasPageController@getTodasIncidencias');
    Route::post('incidencias/create', 'IncidenciasPageController@createIncidencia');
    Route::post('incidencias/edit', 'IncidenciasPageController@editIncidencia');
    Route::post('incidencias/remove', 'IncidenciasPageController@removeIncidencia');
    
    Route::post('incidencias/reportedBy', 'IncidenciasPageController@getIncidenciasReportedBy');
    Route::post('incidencias/assignedTo', 'IncidenciasPageController@getIncidenciasAssignedTo');
    Route::post('incidencias/todo', 'IncidenciasPageController@getIncidenciasToDo');
    Route::post('incidencias/doing', 'IncidenciasPageController@getIncidenciasDoing');
    Route::post('incidencias/blocked', 'IncidenciasPageController@getIncidenciasBlocked');
    Route::post('incidencias/getIncidencia', 'IncidenciasPageController@getIncidenciaUnique');
    Route::post('incidencias/filtered', 'IncidenciasPageController@getFilteredIncidencias');
    Route::post('incidencias/updateState', 'IncidenciasPageController@updateStateIncidencia');
    Route::post('incidencias/getComments', 'IncidenciasPageController@getComments');
    Route::post('incidencias/createComment', 'IncidenciasPageController@createIncidenciaComment');

});

Route::namespace('Users')->group(function () {
    // -------- Controlador Técnico --------
    Route::post('incidencias/technical/getIncidencias/{orderBy}', 'TechnicalController@getTechnicalIncidencias');
    Route::post('incidencias/technical/filtered', 'TechnicalController@getFilteredIncidencias');
    Route::post('incidencias/technical/getIncidenciasAssigned', 'TechnicalController@getAssignedToTechnical');
    Route::post('incidencias/technical/getGroupsIncidencias', 'TechnicalController@getTechnicalGroupIncidencias');
    
    // -------- Controlador Supervisor --------
    Route::post('incidencias/supervisor/getIncidencias/{orderBy}', 'SupervisorController@getSupervisorIncidencias');
    Route::post('incidencias/supervisor/filtered', 'SupervisorController@getFilteredIncidencias');
    Route::post('incidencias/supervisor/noAssigned', 'SupervisorController@getWithoutAssignIncidencias');
    Route::post('incidencias/supervisor/groups/createGroup', 'SupervisorController@createTechnicalTeam');
    Route::post('incidencias/supervisor/groups/getGroups', 'SupervisorController@getTechnicalGroups');
    Route::post('incidencias/supervisor/groups/getTechnicalsGroup', 'SupervisorController@getGroupUsers');
    Route::post('incidencias/supervisor/groups/deleteTechnicalAssign', 'SupervisorController@deleteTechnicalAssign');
    Route::post('incidencias/supervisor/groups/addTechnicalToGroup', 'SupervisorController@createIncidenciaComment');

});

Route::namespace('Utilidades')->group(function () {
    Route::post('getFilteredUsers', 'AutocompleteController@filterUsers');

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

