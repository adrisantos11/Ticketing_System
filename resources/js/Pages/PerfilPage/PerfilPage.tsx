import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './PerfilPage.scss'
import DataCard from '../../Components/DataCard/DataCard';
import { DataCardModel } from '../../Model/model';
import { getUserLogged } from '../../Utilities/Authentication'; 
import { Line, Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import { getTotalIncidencias } from '../../Utilities/Graphics/TechnicalDataGraphs';
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";
import GraphsPage from '../../Pages/PerfilPage/GraphsPage/GraphsPage'
import SettingsPage from '../../Pages/PerfilPage/SettingsPage/SettingsPage'

const PerfilPage = () => {
    const userId = localStorage.userId;
    const history = useHistory();
    // Estilo de letra de la gráfica ---> https://www.chartjs.org/docs/latest/configuration/elements.html
    defaults.global.defaultFontFamily = 'Sen, sans-serif';
    defaults.global.legend.position = 'bottom';
    // defaults.global.title.display = true;
    // defaults.global.title.fontColor = '#636b6f';
    // defaults.global.title.fontSize = 20;
    // defaults.global.title.fontStyle = 'bold';

    // defaults.global.defaultFontSize = '1rem';

    const [perfilDC, setperfilDC] = React.useState<DataCardModel>({
        id: 1,
        title: 'Información sobre el usuario',
        popoverIcon: 'fa-question-circle',
        popoverText: 'En este apartado se muestran todos los datos de su perfil.'
    })

    const [userLogged, setUserLogged] = React.useState({
        id: userId,
        name: '',
        surname1: '',
        surname2: '',
        exp: '',
        email: '',
        role: '',
        phone: '',
        image_url: ''
    });
   
    React.useEffect(() => {
        getUserLogged(userId).then(res => {
            try {
                let rol;
                if (res[0].role == 'technical') {
                    rol = 'Técnico'
                } else if (res[0].role == 'supervisor') {
                    rol = 'Supervisor'
                }
                setUserLogged({
                    ...userLogged,
                    name: res[0].name,
                    surname1: res[0].surname1,
                    surname2: res[0].surname2,
                    exp: res[0].exp,
                    email: res[0].email,
                    role: rol,
                    phone: res[0].phone,
                    image_url: res[0].image_url
                })                    
            } catch (error) {
                console.log(error);
            }
        });
    }, []);
    

    const handleOptionClick = (id: string) => {
        if (id == 'settings') {
            history.push('/home/perfil/settings');
        } else if (id == 'graphs') {
            history.push('/home/perfil/graphs/summaryIncidencias');         
        }
    }

        return (
            <>
            <div className="perfilpage-container">     
                <div className='headerperfil-container'>
                    <p className="title">Perfil del usuario</p>
                </div>
                <div className="photo-container">
                    {/* <div className="bg-header"></div>
                    <div className="bg-body"></div> */}
                    <div className="photo-container">
                        <div className="photo">
                            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" alt=""/> */}
                            <img src={userLogged.image_url} alt=""/>
                        </div>
                        <p className='p-name'>{`${userLogged.name} ${userLogged.surname1} ${userLogged.surname2}`}</p>
                        <div className="role-container">
                            <p className='p-role'>{userLogged.role}</p>
                            <span className='options-icon' onClick={() => handleOptionClick('graphs')}><i className="far fa-chart-bar"></i></span>
                            <span className='options-icon' onClick={() => handleOptionClick('settings')}><i className="fas fa-cog"></i></span>
                        </div>
                    </div>
                </div>
                <div className="bodyperfil-container">
                    <div className="bodydescription-container">
                        <p>En este apartado encontrará toda la información relacionada con usted: incidencias, datos del perfil, configuración de cuenta...</p>
                        
                    </div>
                    <div className="content-container">
                        <div className="left-container">
                            <DataCard dataCardInfo={perfilDC}>
                                <>
                                    <div className="inner-body">
                                        <div className="data-row">
                                            <p className='static-text'>Nombre: </p>
                                            <p>{userLogged.name}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Primer apellido: </p>
                                            <p>{userLogged.surname1}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Segundo apellido: </p>
                                            <p>{userLogged.surname2}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Expediente: </p>
                                            <p>{userLogged.exp}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Dirección de correo: </p>
                                            <p>{userLogged.email}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Rol: </p>
                                            <p>{userLogged.role}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Teléfono de contacto: </p>
                                            <p>{userLogged.phone}</p>
                                        </div>
                                    </div>
                                </>
                            </DataCard>
                        </div>
                        <div className="right-container">
                            <div className="rightData-container">
                            <Switch>
                                <Route path="/home/perfil/graphs" component={GraphsPage}></Route>
                                <Route path="/home/perfil/settings" component={SettingsPage}></Route>
                            </Switch>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
}

export default PerfilPage;