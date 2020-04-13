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
});

Route::namespace('Users')->group(function () {
    // -------- Controlador Técnico --------
    Route::post('incidencias/technical/getAssigned/{orderBy}', 'TechnicalController@getTechnicalIncidencias');

    // -------- Controlador Supervisor --------
    Route::post('incidencias/supervisor/getIncidencias/{orderBy}', 'SupervisorController@getSupervisorIncidencias');
    Route::post('incidencias/supervisor/filtered', 'SupervisorController@getFilteredIncidencias');
    Route::post('incidencias/supervisor/noAssigned', 'SupervisorController@getWithoutAssignIncidencias');

});

Route::namespace('Utilidades')->group(function () {
    Route::post('getFilteredUsers', 'AutocompleteController@filterUsers');

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

