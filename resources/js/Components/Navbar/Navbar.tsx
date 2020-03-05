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
        document.getElementById('body').style.paddingLeft = '210px';
        document.getElementById('btn-cerrarMenu').style.display = 'unset';
        document.getElementById('btn-abrirMenu').style.display = 'none';

    }

    const handleClickCloseSlidebar = () => {
        document.getElementById('slidevar').style.left = '-210px';
        document.getElementById('body').style.paddingLeft = '0px';
        document.getElementById('btn-cerrarMenu').style.display = 'none';
        document.getElementById('btn-abrirMenu').style.display = 'unset';
    }

    const handleClickOptions = (e: any) => {
        let optionSelected = e.target.getAttribute("data-id");
        console.log(optionSelected);
        e.target.classList.toggle('active');
    }

    return(
        <>
            <div className='navbar-container' id="slidevar">
                <div className="options-container">
                    <span className="menu-btn" id="btn-abrirMenu" onClick={handleClickOpenSlidebar}><i className="fas fa-bars"></i></span>
                    <span className="menu-btn" id="btn-cerrarMenu" onClick={handleClickCloseSlidebar}><i className="fas fa-times"></i></span>

                    <div className="span-container">
                        <span data-id="perfil-option"><b>Perfil</b><i className="fas fa-user"></i></span>
                        <span data-id="incidencias-option"><b>Incidencias</b><i className="fas fa-tools"></i></span>
                        <span data-id="calendario-option"><b>Calendario</b><i className="far fa-calendar-alt"></i></span>
                        <span data-id="aulas-option"><b>Disponibilidad Aulas</b><i className="far fa-clock"></i></span>
                    </div>
                </div>
                <Button buttonInfo={logoutButton} handleClick={handleClickLogoutButton}></Button>
            </div>
        </>
    );
}

export default Navbar;