import * as ReactDOM from 'react-dom';
import * as React from 'react'
import axios from 'axios';
import * as ReactRouterDOM from "react-router-dom";
import history from '../../Utilities/createHistory';

import { ButtonModel, InputModel } from '../../Model/model'
import { Button } from '../../Components/Button/Button';
import './MainPage.scss'

import { getProfile } from '../../Utilities/Authentication'

export const MainPage: React.FunctionComponent = () => {
    const [buttonInfo] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Identifícate',
        colour: 'red',
        type: 'outline-secondary',
        icon: 'fas fa-user',
        extraClass: ''
    });

    const [userLogged, setUserLogged] = React.useState({
        exp: '',
        password: ''
    });

    const handleClickButton = () => {
        console.log('Hola');
    }
     const componentDidMount = () => {
        getProfile().then(res => {
            setUserLogged({
                ...userLogged,
                exp: res.user.exp,
                password: res.user.password
            })
        })
     }
    return(
        <>
            <p>Nº expediente: {userLogged.exp}</p>
            <p>Constrasña hasheada: {userLogged.password}</p>
        </>
    );
}

if (document.getElementById('main')) {
    ReactDOM.render(<MainPage />, document.getElementById('main'));
}
