import * as ReactDOM from 'react-dom';
import * as React from 'react'

import { ButtonModel, InputModel } from '../../Model/model'
import Button from '../../Components/Button/Button';
import Navbar from '../../Components/Navbar/Navbar'
import './MainPage.scss'

import { getProfile, logout } from '../../Utilities/Authentication'
import { HashRouter, useHistory } from "react-router-dom";

const MainPage = () => {
    const history = useHistory();
    const [isLogged, setIsLogged] = React.useState(false);
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

    const [closeSlidebarButton, setCloseSlidebarButton] = React.useState<ButtonModel>({
        id: 1,
        texto: '',
        color: 'primary',
        type: 'outline-secondary',
        icon: 'fas fa-bars',
        extraClass: ''
    });

    React.useEffect(() => {
        getProfile().then(res => {
            try {
                if(res) {
                    setIsLogged(true);
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
                } else
                    setIsLogged(false)
            } catch (error) {
                console.log(error);
            }
        })
    }, []);

    const handleClickCloseSlidebar = (e: React.MouseEvent) => {
        console.log('Se cierra slidebar');
        document.getElementById('slidevar').style.width = '250px';
        document.getElementById('body').style.marginLeft = '250px';
        console.log(document.getElementById('slidevar').style.width);
    }

    if(isLogged) {
        return(
            <>
            <div className="mainpage-container">
                <Navbar></Navbar>
                <div className="body-container" id="body">
                    <Button buttonInfo={closeSlidebarButton} handleClick={handleClickCloseSlidebar}></Button>
                    <p>Nº expediente: <b>{userLogged.exp}</b></p>
                    <br/>
                    <p>Correo: <b>{userLogged.email}</b></p>
                </div>
            </div>
            </>
        );
    } else {
        return (
            <>
                <h1>Tienes que iniciar sesión para poder acceder a esta página.</h1>
            </>
        );
    }
}

export default MainPage;
