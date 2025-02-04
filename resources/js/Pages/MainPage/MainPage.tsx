import * as ReactDOM from 'react-dom';
import * as React from 'react'
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";
import './MainPage.scss'

import { ButtonModel, InputModel, ToastModel } from '../../Model/model'
import Button from '../../Components/Button/Button';
import Navbar from '../../Components/Navbar/Navbar'

import { getProfile, logout } from '../../Utilities/Authentication'
import PerfilPage from "../PerfilPage/PerfilPage"
import IncidenciasPage from "../IncidenciasPage/IncidenciasPage"
import CreateIncidenciaPage from "../IncidenciasPage/TabOptions/CreateIncidenciaPage/CreateIncidenciaPage"
import IncidenciaViewPage from "../IncidenciasPage/IncidenciaViewPage/IncidenciaViewPage"
import Toast from '../../Components/Toast/Toast';
import VisitorPage from '../UserPages/VisitorPage/VisitorPage'
import AdminPage from '../UserPages/AdminPage/AdminPage';

const MainPage = () => {
    const [isLogged, setIsLogged] = React.useState(false);

    const [userLogged, setUserLogged] = React.useState({
        name: '',
        surname1: '',
        surname2: '',
        exp: '',
        email: '',
        phone: '',
        role: ''
    });
    
    const [toastDeleteIncidencia] = React.useState<ToastModel>({
        id: 'toastDelete',
        title: '¡Incidencia eliminada!',
        description: 'La incidencia ha sido eliminada correctamente.',
        circleColor: '--red',
        delay: 4000
    });

    const [toastCreateIncidencia] = React.useState<ToastModel>({
        id: 'toastCreate',
        title: '¡Incidencia creada!',
        description: 'La incidencia se ha creado correctamente.',
        circleColor: '--blue',
        delay: 4000
    });

    
    const [toastIncidenciaChangeState] = React.useState<ToastModel>({
        id: 'toastIncidenciaStateChanged',
        title: '¡Estado actualizado!',
        description: 'El estado de la incidencia se ha cambiado y guardado correctamente.',
        circleColor: '--blue',
        delay: 4000
    });


    const [toastEditIncidencia] = React.useState<ToastModel>({
        id: 'toastIncidenciaEditted',
        title: '¡Incidencia editada!',
        description: 'Los cambios realizados se han guardado correctamente.',
        circleColor: '--blue',
        delay: 4000
    });

    const [toastCreateTechnicalGroup] = React.useState<ToastModel>({
        id: 'toastCreateTechnicalGroup',
        title: '¡Grupo creado!',
        description: 'El grupo de técnicos se ha creado correctamente.',
        circleColor: '--blue',
        delay: 4000
    });

    const [toastSaveProfileChanges] = React.useState<ToastModel>({
        id: 'toastSaveProfileChanges',
        title: '¡Cambios guardados!',
        description: 'El perfil se ha modificado y guardado correctamente.',
        circleColor: '--blue',
        delay: 4000
    });

    const [toastCreateUser] = React.useState<ToastModel>({
        id: 'toastCreateUser',
        title: '¡Usuario creado!',
        description: 'El usuario se ha creado y guardado correctamente.',
        circleColor: '--blue',
        delay: 4000
    });

    const [toastImportExcel] = React.useState<ToastModel>({
        id: 'toastImportExcel',
        title: '¡Excel importado correctamente!',
        description: 'Los usuarios se han generado y almacenado correctamente en la Base de Datos.',
        circleColor: '--blue',
        delay: 4000
    });

    const [toastImportError] = React.useState<ToastModel>({
        id: 'toastImportError',
        title: '¡ERROR!',
        description: 'Ha ocurrido un error importando los datos del Excel. Compruebe que la estructura está bien planteada.',
        circleColor: '--red',
        delay: 4000
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

    if(isLogged) {
        return(
            <>
            <div className="mainpage-container">
                <Navbar></Navbar>
                <div className="body-container" id="body">
                    <Switch>
                        <Route path="/home/perfil" component={PerfilPage}></Route>
                        <Route path="/home/incidencias" component={IncidenciasPage}></Route>
                        <Route path="/home/incidencia-view/:idIncidencia" component={IncidenciaViewPage}></Route>
                        <Route path="/home/visitor" component={VisitorPage}></Route>
                        <Route path="/home/admin" component={AdminPage}></Route>
                    </Switch>
                </div>
                <div className="toast-container">
                    <Toast toastProps={toastDeleteIncidencia}></Toast>
                    <Toast toastProps={toastCreateIncidencia}></Toast>
                    <Toast toastProps={toastIncidenciaChangeState}></Toast>
                    <Toast toastProps={toastEditIncidencia}></Toast>
                    <Toast toastProps={toastCreateTechnicalGroup}></Toast>
                    <Toast toastProps={toastSaveProfileChanges}></Toast>
                    <Toast toastProps={toastCreateUser}></Toast>
                    <Toast toastProps={toastImportExcel}></Toast>
                    <Toast toastProps={toastImportError}></Toast>
                    
                </div>
            </div>
            </>
        );
    } else {
        return (
            <>
                <h1>Tienes que iniciar sesión para poder acceder a esta página.</h1>
                <a href="/">Pagina de inicio</a>
            </>
        );
    }
}

export default MainPage;
