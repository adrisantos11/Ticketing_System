<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

use App\Incidencia;

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
    public function register(Request $request)
    {
        // Se almacena la respuesta en formato JSON dentro de una variable.
        // $respuestaJSON = $request->json();

        //Realizamos las validaciones correspondientes para poder crear una instancia del modelo User correctamente.
        $validator = Validator::make($request->json()->all(), [
            'name'      => 'required|string|max:255',
            'surname1'  => 'required|string|max:255',
            'surname2'  => 'required|string|max:255',
            'exp'       => 'required|numeric|unique:users',
            'email'     => 'required|string|email|max:255|unique:users',
            'password'  => 'string|min:4',
            'phone'     => 'required|numeric',
            'role'      => 'required',
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
        $user = User::create([
            'name'      => $request->json()->get('name'),
            'surname1'  => $request->json()->get('surname1'),
            'surname2'  => $request->json()->get('surname2'),
            'exp'       => $request->json()->get('exp'),
            'email'     => $request->json()->get('email'),
            'password'  => Hash::make($request->json()->get('password')),
            'phone'     => $request->json()->get('phone'),
            'role'      => $request->json()->get('role'),
        ]);
        
        // Se genera un token específico para el usuario recién registrado.
        $token = auth()->fromUser($user);

        // Se devuelve la respuesta HTTP en formato JSON con el 
        return response()->json(compact('user', 'token'), 201);
    }
    
    /**
     * Función que devuelve el token asociado al usuario que está inicindo sesión.
     * Se comprueba mediante las credenciales de 'email' y 'password'
     * 
     * @param request
     */
    public function login(Request $request) 
    {
        $credentials = $request->only('exp', 'password');

        try {
            if (! $token = auth()->attempt($credentials)) 
            {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $th) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }


    public function getAuthenticatedUser()
    {
        try {
            if (! $user = auth()->user()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }

    public function logout() 
    {
        try {
            auth()->logout();
            return response()->json(['message' => 'Successfully logged out']);
        } catch (JWTException $th) {
            return response()->json(['error' => 'no se puede cerrar sesión']);
        }
    }
}