import axios from 'axios';

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
        console.log(res.data.token);
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
}

export const getProfile = () => {
    return axios
    .post('api/profile', {
        headers: { Authorization : `Bearer ${localStorage.usertoken}`}
    })
    .then(res => {
        console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}