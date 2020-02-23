<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;


use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
Use Tymon\JWTAuth\JWTManager as JWT;

class UserController extends Controller
{

    /**
     * Función que se encarga de realizar el registro del usuario en la Base de Datos.
     * @param request 
     */
    public function registro(Request $request)
    {
        // Se almacena la respuesta en formato JSON dentro de una variable.
        // $respuestaJSON = $request->json();

        //Realizamos las validaciones correspondientes para poder crear una instancia del modelo User correctamente.
        $validator = Validator::make($request->json()->all(), [
            'Nombre'        => 'required|string|max:255',
            'Apellido1'     => 'required|string|max:255',
            'Apellido2'     => 'required|string|max:255',
            'Expediente'    => 'required|numeric|unique:users',
            'Email'         => 'required|string|email|max:255|unique:users',
            'Contraseña'    => 'string|min:4',
            'Telefono'      => 'required|numeric',
            'Rol'           => 'required',
        ]);
        /**
         * Método interno de Validation -> fails()
         * Devuelve TRUE o FALSE dependiendo si todas las validaciones se han cumplido correctamente.
         */
        if($validator->fails())
        {
            return response()->json($validator->errors()->toJson(), 400);
        }

        //Se crea el usuario con los datos obtenidos del $request, transformandolo en JSON.
        $usuario = User::create([
            'Nombre'        => $request->json()->get('Nombre'),
            'Apellido1'     => $request->json()->get('Apellido1'),
            'Apellido2'     => $request->json()->get('Apellido2'),
            'Expediente'    => $request->json()->get('Expediente'),
            'Email'         => $request->json()->get('Email'),
            'Contraseña'    => Hash::make($request->json()->get('Contraseña')),
            'Telefono'      => $request->json()->get('Telefono'),
            'Rol'           => $request->json()->get('Rol'),
        ]);
        
        // Se genera un token específico para el usuario recién registrado.
        $token = JWTAuth::fromUser($usuario);

        // Se devuelve la respuesta HTTP en formato JSON con el 
        return response()->json(compact('usuario', 'token'), 201);
    }

    public function login(Request $request) 
    {
        $userData = $request->json()->all();

        try {
            if (!$token == auth()->attempt($userData)) 
            {
                return response()->json([
                    'error' => 'Los datos del usuario son incorrectos.'
                ], 400);
            }
        } catch (JWTException $th) {
            return response()->json([
                'error' => 'could_not_create_token'
            ], 500);
        }

        return response()->json(compact('token'));
    }


    public function getAuthenticatedUser()
    {
        try {
            if(!$user == JWTAuth::parseToken()->authenticate())
            {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $th) {
            return response()->json(['token_expired'], $th->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $th) {
            return response()->json(['token_invalid'], $th->getStatusCode());
        
        } catch (Tymon\JWTAuth\Exceptions\JWTException $th) {
            return response()->json(['token_absent'], $th->getStatusCode());
        
        }
        return response()->json(compact('user'));
    }

}