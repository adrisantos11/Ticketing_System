import * as React from 'react'
// import { InputModel } from '../../Model/model'

import './Navbar.scss'
import { ButtonModel, InputModel } from '../../Model/model'
import Button from '../../Components/Button/Button';
import { getProfile, logout } from '../../Utilities/Authentication'
import { HashRouter, useHistory } from "react-router-dom";

const Navbar: React.FunctionComponent = (props: any) => {
    const history = useHistory();
    const [logoutButton, setLogoutButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Cerrar Sesión',
        color: 'red',
        type: 'outline-secondary',
        icon: '',
        extraClass: ''
    });



    const handleClickLogoutButton = (e: React.MouseEvent) => {
        logout().then(result => {
            if (result)
                history.push('/');
        });

    }

    const handleClickOpenSlidebar = () => {
        document.getElementById('slidevar').style.left = '0px';
        document.getElementById('body').style.marginLeft = '250px';
        document.getElementById('btn-cerrarMenu').style.display = 'unset';
        document.getElementById('btn-abrirMenu').style.display = 'none';

    }

    const handleClickCloseSlidebar = () => {
        document.getElementById('slidevar').style.left = '-250px';
        document.getElementById('body').style.marginLeft = '0px';
        document.getElementById('btn-cerrarMenu').style.display = 'none';
        document.getElementById('btn-abrirMenu').style.display = 'unset';
    }

    return(
        <>
            <div className='navbar-container' id="slidevar">
                <div className="options-container">
                    <span className="menu-btn" id="btn-abrirMenu" onClick={handleClickOpenSlidebar}><i className="fas fa-bars"></i></span>
                    <span className="menu-btn" id="btn-cerrarMenu" onClick={handleClickCloseSlidebar}><i className="fas fa-times"></i></span>

                    <div className="span-container">
                        <span id="perfil-option">Perfil<i className="fas fa-user"></i></span>
                        <span id="incidencias-option">Incidencias</span>
                        <span id="calendario-option">Calendario</span>
                        <span id="aulas-option">Disponibilidad Aulas</span>
                    </div>
                </div>
                <Button buttonInfo={logoutButton} handleClick={handleClickLogoutButton}></Button>
            </div>
        </>
    );
}

export default Navbar;