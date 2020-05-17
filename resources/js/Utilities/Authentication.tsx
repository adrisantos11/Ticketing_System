import * as ReactDOM from 'react-dom';
import * as React from 'react'
import axios from 'axios';
import * as ReactRouterDOM from "react-router-dom";

/**
 * Función que se encarga de realizar el registro del nuevo usuario.
 * @param newUser 
 */
export const register = (newUser: any) => {
    return axios
    .post('api/register', newUser, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
}

/**
 * Función que se encarga de la autorización de login a un usuario expecífico.
 * @param user
 */
export const login = (user: any) => {
    /**
     *  Devolvemos el resultado obtenido mediante la petición en la URL de 'api/login'
     *  * Datos de la petición:
     *      * - Exp: expediente del usuario correspondiente.
     *      * - password: constraseña del usuario que solicita la autorización de login.
     */

    return axios
    .post('api/login',{
        exp: user.exp,
        password: user.password
    }, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        /**
         *  - 'usertoken': el nombre del DOMString contenedor de la clave que se quiere actualizar.
         *  - 'res.data.token': dato que se guarda en el DOMString.
         */
        localStorage.setItem('usertoken', res.data.token);
        localStorage.setItem('userId', res.data.user_id);
        localStorage.setItem('userRol', res.data.user_role);
        localStorage.setItem('userEmail', res.data.email);
        return res;
    })
    .catch(err => {
        if(err.response) {
            console.log(err.response.data.error);
            console.log(err.response.status);
        } else if (err.request) {
            console.log(err.request);
            
        } else
            console.log(err);
    })
}

export const getProfile = () => {
    return axios
    .get('api/home', {
        headers: { Authorization : `Bearer ${localStorage.usertoken}`}
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const logout = () => {
    return axios
    .post('api/logout',{
        token: localStorage.usertoken
    }, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        if(err)
            console.log(err);
    })
}

export const getUser = (id: number) => {
    return axios
    .post('api/getUser',{
        id: id
    }, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        if(err)
            console.log(err);
    })
}