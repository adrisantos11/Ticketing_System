import * as ReactDOM from 'react-dom';
import * as React from 'react'
import axios from 'axios';
import * as ReactRouterDOM from "react-router-dom";
import history from '../../Utilities/createHistory';

import { ButtonModel, InputModel } from '../../model'
import { Button } from '../../Components/Button/Button';
import { Input } from '../../Components/Input/Input';
import { login } from '../../Utilities/Authentication'
import './Login.scss'



export const Login: React.FunctionComponent = () => {
    const [buttonInfo] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Identifícate',
        colour: 'red',
        type: 'outline-secondary',
        icon: 'fas fa-user',
        extraClass: ''
    });

    const [inputUser] = React.useState<InputModel>({
        id: 1,
        label: 'Usuario',
        placeholder: 'usuario',
        colour: 'secondary',
        type: 'email',
        error_control_text: 'No se ha encontrado el usuario introducido.',
        extraClass: ''
    });

    const [inputPassword] = React.useState<InputModel>({
        id: 1,
        label: 'Contraseña',
        placeholder: 'Contraseña',
        colour: 'secondary',
        type: 'password',
        error_control_text: 'La contraseña no coincide',
        extraClass: ''
    });
    
    const [userData, setUserData] = React.useState({
        exp: 21619919,
        password: 1234567
    });

    const handleClickButton = () => {
        const user = {
            exp: userData.exp,
            password: userData.password
        }
        login(user).then(result => {
            if (result) {
                console.log(result);
                history.push('/home');
            }   
        });
    }

    return(
        <>
            <div className="login">
                <div className="centered_container centered_container--description">
                    <p className="login_title text-secondary">
                        TICKETCLASS :D
                    </p>
                    <div className="description_text">
                        <p>¡Bienvenido a <b>"Ticketclass :D"</b>!</p>
                        <p> Explora y usa esta herramineta para la gestión de las incidencias dentro de tu entorno de trabajo.</p>
                        <p> Consigue una mayor rapidez de respuesta.</p>
                    </div>
                </div>
                <div className="centered_container centered_container--login">
                    <p className="login_title text-secondary">
                        Iniciar sesion
                    </p>
                    <div className="inputs_container">
                        <Input inputInfo={inputUser}></Input>
                        <Input inputInfo={inputPassword}></Input>
                    </div>
                    <Button buttonInfo={buttonInfo} handleClick={handleClickButton}></Button>
                </div>
            </div>
        </>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<Login />, document.getElementById('root'));
}
