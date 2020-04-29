import * as ReactDOM from 'react-dom';
import * as React from 'react'
//import history from '../../Utilities/createHistory';

import { ButtonModel, InputModel } from '../../Model/model'
import Button from '../../Components/Button/Button';
import { Input } from '../../Components/Input/Input';
import { login } from '../../Utilities/Authentication'
import './Login.scss'
import { HashRouter, useHistory } from "react-router-dom";

const Login = () => {
    const history = useHistory();
    const [buttonInfo] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Identifícate',
        color: 'primary',
        type: 'outline-primary',
        icon: 'fas fa-user',
        target_modal:'',
        extraClass: ''
    });

    const [inputUser, setInputUser] = React.useState<InputModel>({
        id: 1,
        value: '',
        label: 'Expediente',
        labelColor: 'white',
        placeholder: 'Ej: 25342783',
        color: 'primary',
        type: 'number',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [inputPassword, setInputPassword] = React.useState<InputModel>({
        id: 2,
        value: '',
        label: 'Contraseña',
        placeholder: 'Contraseña',
        labelColor: 'white',
        color: 'primary',
        type: 'password',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
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
        if(user.exp == '' || user.password == '') {
            setInputUser({
                ...inputUser,
                color: 'red'
            });
            setInputPassword({
                ...inputPassword,
                error_control_text: 'Alguno de los campos está vacío',
                color: 'red'
            });

        } else {
            login(user).then(result => {
                if (result) {
                    history.push('/home/perfil');
                } else {
                    setInputUser({
                        ...inputUser,
                        color: 'red'
                    });
                    setInputPassword({
                        ...inputPassword,
                        error_control_text: 'Los datos introducidos no coinciden',
                        color: 'red'
                    });
                }
            });
        }

    }

    const handleChangeInput = (value: string, id: number) => {
        if (id == 1) {
            setInputUser({
                ...inputUser,
                value: value
            })
            setUserData({
                ...userData,
                exp: value
            })
        } else if (id == 2) {
            setInputPassword({
                ...inputPassword,
                value: value
            })
            setUserData({
                ...userData,
                password: value
            })
        }
    }
    return(
        <>
        <div className="login-main">
            <div className="login">
                <div className="centered_container centered_container--description">
                    <p className="login_title">
                        TICKETCLASS :D
                    </p>
                    <div className="description_text">
                        <p>¡Bienvenido a <b>"Ticketclass :D"</b>!</p>
                        <p> Explora y usa esta herramineta para la gestión de las incidencias dentro de tu entorno de trabajo.</p>
                        <p> Consigue una mayor rapidez de respuesta.</p>
                    </div>
                    <div className="icons-container">
                        <a><i className="far fa-envelope-open"></i></a>
                        <a><i className="fas fa-phone"></i></a>
                    </div>
                </div>
                <div className="centered_container centered_container--login">
                    <p className="login_title">
                        Iniciar sesion
                    </p>
                    <div className="inputs_container">
                        <Input inputInfo={inputUser} handleChangeInput={handleChangeInput}></Input>
                        <Input inputInfo={inputPassword} handleChangeInput={handleChangeInput}></Input>
                    </div>
                    <Button buttonInfo={buttonInfo} handleClick={handleClickButton}></Button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;