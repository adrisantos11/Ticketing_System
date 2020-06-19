import * as React from 'react'
// import { InputModel } from '../../Model/model'

import './Navbar.scss'
import { ButtonModel, InputModel, DropdownModel } from '../../Model/model'
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown'
import { getProfile, logout } from '../../Utilities/Authentication'
import { HashRouter, useHistory, NavLink } from "react-router-dom";

interface NavbarIF {
    handleClickOptions: (name: string) => void;
}

const Navbar: React.FunctionComponent<NavbarIF> = (props: NavbarIF) => {
    const history = useHistory();
    const userRolLogged = localStorage.userRol;
    // let iconProfile: any;
    // if (userRolLogged == 'technical') {
    //     iconProfile = (<i className="fas fa-user"></i>);
    // } else if (userRolLogged == 'supervisor') {
    //     iconProfile = (<i className="fas fa-user-tie"></i>);
    // }

    const [logoutButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Cerrar Sesión',
        color: 'red',
        type: 'outline-secondary',
        icon: '',
        target_modal:'',
        extraClass: ''
    });

    const [adminDropdown, setAdminDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: "Adminstrador",
        groupItems: [1],
        groupIds: [1],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const handleClickLogoutButton = (e: React.MouseEvent) => {
        logout().then(result => {
            if (result)
                history.push('/');
        });

    }

    const handleClickOpenSlidebar = () => {
        if(screen.width > 768) {
            document.getElementById('slidevar').style.left = '0px';
            document.getElementById('body').style.paddingLeft = '210px';
            document.getElementById('btn-cerrarMenu').style.display = 'unset';
            document.getElementById('btn-abrirMenu').style.display = 'none';
        } else {
            document.getElementById('slidevar').style.top = '0px';
            document.getElementById('body').style.paddingTop = '400px';
            document.getElementById('btn-cerrarMenu').style.display = 'unset';
            document.getElementById('btn-abrirMenu').style.display = 'none';

        }

    }

    const handleClickCloseSlidebar = () => {
        if(screen.width > 768) {
            document.getElementById('slidevar').style.left = '-210px';
            document.getElementById('body').style.paddingLeft = '0px';
            document.getElementById('btn-cerrarMenu').style.display = 'none';
            document.getElementById('btn-abrirMenu').style.display = 'unset';
        } else {
            document.getElementById('slidevar').style.top = '-344px';
            document.getElementById('body').style.paddingTop = '56px';
            document.getElementById('btn-cerrarMenu').style.display = 'none';
            document.getElementById('btn-abrirMenu').style.display = 'unset';
        }
    }

    const handleClickNavOption = (e: any) => {
        if (e.target.id == 'incidencias-option') {
            history.push('/home/incidencias/show');
        } else if (e.target.id == 'perfil-option') {
            history.push('/home/perfil/graphs/summaryIncidencias');
        }
        handleClickCloseSlidebar();
    }

    const opcionesNavbar = (userRolLogged: string) => {
        switch (userRolLogged) {
            case 'supervisor':
                console.log('Hola');
                return(
                    <div className="btn-group btn-group-toggle span-container" data-toggle="buttons">
                        <label className="btn navbar-item" data-toogle="tooltip" data-placement="top" title='Perfil'>
                            <input type="radio" name="options" id="perfil-option" onClick={handleClickNavOption}/><i className="fas fa-user-tie"></i>
                            <span className="option-text">Perfil</span>
                        </label>
                        <label className="btn navbar-item active" data-toogle="tooltip" data-placement="top" title='Incidencias'>
                            <input type="radio" name="options" id="incidencias-option" onClick={handleClickNavOption}/><i className="fas fa-tools"></i>
                            <span className="option-text">Incidencias</span>
                        </label>
                    </div>

                )
                break;
            case 'technical':
                return(
                    <div className="btn-group btn-group-toggle span-container" data-toggle="buttons">
                        <label className="btn navbar-item" data-toogle="tooltip" data-placement="top" title='Perfil'>
                            <input type="radio" name="options" id="perfil-option" onClick={handleClickNavOption}/><i className="fas fa-user"></i>
                            <span className="option-text">Perfil</span>
                        </label>
                        <label className="btn navbar-item active" data-toogle="tooltip" data-placement="top" title='Incidencias'>
                            <input type="radio" name="options" id="incidencias-option" onClick={handleClickNavOption}/><i className="fas fa-tools"></i>
                            <span className="option-text">Incidencias</span>
                        </label>
                    </div>
                )
                break;

            case 'admin':
                return('');
                break;
                
            case 'visitor':
                return('');
                break;
            default:
                break;
        }

    }

    return(
        <>
            <div className='navbar-container ' id="slidevar">
                <HashRouter>
                    <div className="options-container">
                        <span className="menu-btn" id="btn-abrirMenu" onClick={handleClickOpenSlidebar}><i className="fas fa-bars"></i></span>
                        <span className="menu-btn" id="btn-cerrarMenu" onClick={handleClickCloseSlidebar}><i className="fas fa-times"></i></span>
                        {
                            opcionesNavbar(userRolLogged)
                        }
                    </div>
                    <div className="nabvar-footer">
                        <div className="logout-container">
                            <Button buttonInfo={logoutButton} handleClick={handleClickLogoutButton}></Button>
                        </div>
                        <div className="footertext-container">
                            <b>Ticketclass</b>
                        </div>
                    </div>
                </HashRouter>
            </div>
        </>
    );
}

export default Navbar;