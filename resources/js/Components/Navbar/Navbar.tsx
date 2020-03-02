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


    return(
        <>
            <div className='navbar-container' id="slidevar">
                <div className="logo-container">
                </div>
                <div className="options-container">
                    <a href="#" className="btn-cerrar"><i className="far fa-times-circle"></i></a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>
                <Button buttonInfo={logoutButton} handleClick={handleClickLogoutButton}></Button>
            </div>
        </>
    );
}

export default Navbar;