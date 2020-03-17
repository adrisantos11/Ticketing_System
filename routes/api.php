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

Route::namespace('Pages')->group(function () {
    Route::get('incidencias', 'IncidenciasPageController@getTodasIncidencias');
    Route::post('incidencias/reportedBy', 'IncidenciasPageController@getIncidenciasReportedBy');
    Route::post('incidencias/assignedTo', 'IncidenciasPageController@getIncidenciasAssignedTo');
    Route::post('incidencias/todo', 'IncidenciasPageController@getIncidenciasToDo');
    Route::post('incidencias/doing', 'IncidenciasPageController@getIncidenciasDoing');
    Route::post('incidencias/blocked', 'IncidenciasPageController@getIncidenciasBlocked');
    Route::post('incidencias/create', 'IncidenciasPageController@createIncidencia');
    Route::post('incidencias/orderByPriority', 'IncidenciasPageController@getIncidenciasOrderByLimitDay');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

