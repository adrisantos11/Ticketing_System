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

    const handleClickButton = (e: React.MouseEvent) => {
        logout().then(result => {
            if (result)
                history.push('/');
        });

    }

    return(
        <>
            <div className='navbar-container'>
                <div className="logo-container">
                </div>
                    <Button buttonInfo={logoutButton} handleClick={handleClickButton}></Button>
            </div>
        </>
    );
}

export default Navbar;