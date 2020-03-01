import * as ReactDOM from 'react-dom';
import * as React from 'react'
//import history from '../../Utilities/createHistory';

import { ButtonModel, InputModel } from '../../Model/model'
import { Button } from '../../Components/Button/Button';
import { Input } from '../../Components/Input/Input';
import { login } from '../../Utilities/Authentication'
import './Login.scss'
import { HashRouter, useHistory } from "react-router-dom";


const Login = () => {
    const history = useHistory();
    const [buttonInfo] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Identifícate',
        color: 'red',
        type: 'outline-secondary',
        icon: 'fas fa-user',
        extraClass: ''
    });

    const [inputUser, setInputUser] = React.useState<InputModel>({
        id: 1,
        label: 'Expediente',
        placeholder: 'Ej: 25342783',
        color: 'secondary',
        type: 'number',
        error_control_text: '',
        extraClass: ''
    });

    const [inputPassword, setInputPassword] = React.useState<InputModel>({
        id: 2,
        label: 'Contraseña',
        placeholder: 'Contraseña',
        color: 'secondary',
        type: 'password',
        error_control_text: 'Los datos introducidos no coinciden',
        extraClass: ''
    });
    
    const [userData, setUserData] = React.useState({
        exp: '',
        password: ''
    });

    const handleClickButton = (e: React.MouseEvent, id: number) => {
        const user = {
            exp: userData.exp,
            password: userData.password
        }
        console.log('El expendiente del usuario es: ' + user.exp);
        login(user).then(result => {
            if (result) {
                console.log(result);
                console.log(history);
                history.push('/home');
            } else {
                setInputUser({
                    ...inputUser,
                    extraClass: 'error'
                });
                setInputPassword({
                    ...inputPassword,
                    extraClass: 'error'
                });
            }
        });
    }

    const handleChangeInput = (value: string, id: number) => {
        if (id == 1) {
            setUserData({
                ...userData,
                exp: value
            })
        } else if (id == 2) {
            setUserData({
                ...userData,
                password: value
            })
        }
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
                        <Input inputInfo={inputUser} handleChangeInput={handleChangeInput}></Input>
                        <Input inputInfo={inputPassword} handleChangeInput={handleChangeInput}></Input>
                    </div>
                    <Button buttonInfo={buttonInfo} handleClick={handleClickButton}></Button>
                </div>
            </div>
        </>
    );
}

export default Login;