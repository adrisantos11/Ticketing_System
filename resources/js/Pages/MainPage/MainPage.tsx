import * as ReactDOM from 'react-dom';
import * as React from 'react'

import { ButtonModel, InputModel } from '../../Model/model'
import { Button } from '../../Components/Button/Button';
import './MainPage.scss'

import { getProfile, logout } from '../../Utilities/Authentication'
import { HashRouter, useHistory } from "react-router-dom";

const MainPage = () => {
    const history = useHistory();
    const [logoutButton, setLogoutButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Cerrar Sesión',
        color: 'red',
        type: 'outline-secondary',
        icon: '',
        extraClass: ''
    });

    const [userLogged, setUserLogged] = React.useState({
        name: '',
        surname1: '',
        surname2: '',
        exp: '',
        email: '',
        phone: '',
        role: ''
    });

    React.useEffect(() => {
        getProfile().then(res => {
            try {
                console.log(res);
                setUserLogged({
                    ...userLogged,
                    name: res.user.name,
                    surname1: res.user.surname1,
                    surname2: res.user.surname2,
                    exp: res.user.exp,
                    email: res.user.email,
                    phone: res.user.phone,
                    role: res.user.role
                });
            } catch (error) {
                console.log(error);
            }
        })
    }, []);

    const handleClickButton = (e: React.MouseEvent) => {
        console.log(e);
        logout().then(result => {
            if (result) {
                console.log(result);
                console.log(history);
                history.push('/');
            } 
        });

    }
    return(
        <>
            <p>Nº expediente: <b>{userLogged.exp}</b></p>
            <br/>
            <p>Correo: <b>{userLogged.email}</b></p>
            <Button buttonInfo={logoutButton} handleClick={handleClickButton}></Button>
        </>
    );
}

export default MainPage;
