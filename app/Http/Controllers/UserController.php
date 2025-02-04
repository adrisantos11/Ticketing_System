<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

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

    function importExcelData(Request $request) {
        $data = $request->arrayData;
        $obj = (object) $data[0];
        for ($i=0; $i < sizeof($data); $i++) {
            $obj = (object) $data[$i];
            DB::table('users')->insert([
                'name'      => $obj->name,
                'surname1'  => $obj->surname1,
                'surname2'  => $obj->surname2,
                'exp'       => $obj->exp,
                'password'  => Hash::make($obj->password),
                'email'     => $obj->email,
                'phone'     => $obj->phone,
                'role'      => $obj->role,
                ]); 
        }  
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
        $user_id = auth()->user()->id;
        $user_role = auth()->user()->role;
        $email = auth()->user()->email;
        return response()->json(compact('user_id', 'user_role', 'email', 'token'));
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

    public function getUserLogged(Request $request) {
        $user_id = $request->id;
        $user    = DB::table('users')->select('id', 'name', 'surname1', 'surname2', 'exp', 'email', 'role', 'phone', 'image_url')->where('id', $user_id)->get();
        return $user;
    }

    public function saveNewName(Request $request) {
        DB::table('users')->where('id', $request->id)
            ->update([
                'name' => $request->name,
                'surname1' => $request->surname1,
                'surname2' => $request->surname2,
        ]);
    }

    public function saveNewEmail(Request $request) {
        DB::table('users')->where('id', $request->id)
            ->update([
                'email' => $request->email
        ]);
    }

    public function saveNewPassword(Request $request) {
        DB::table('users')->where('id', $request->id)
            ->update([
                'password' => Hash::make($request->password)
        ]);
    }

    public function getAllUsers() {
        return DB::table('users')->select('exp')->get();
    }
}