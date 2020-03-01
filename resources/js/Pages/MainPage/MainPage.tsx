import * as ReactDOM from 'react-dom';
import * as React from 'react'

import { ButtonModel, InputModel } from '../../Model/model'
import './MainPage.scss'

import { getProfile } from '../../Utilities/Authentication'

const MainPage = () => {
    const [buttonInfo] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Identifícate',
        colour: 'red',
        type: 'outline-secondary',
        icon: 'fas fa-user',
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

    return(
        <>
            <p>Nº expediente: <b>{userLogged.exp}</b></p>
            <br/>
            <p>Correo: <b>{userLogged.email}</b></p>
        </>
    );
}

export default MainPage;
