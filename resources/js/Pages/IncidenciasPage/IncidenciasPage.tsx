import * as ReactDOM from 'react-dom';
import * as React from 'react'
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";
import './IncidenciasPage.scss'
import { TabsModel } from '../../Model/model'
import Button from '../../Components/Button/Button';
import Tabs from '../../Components/Tabs/Tabs';
import CreateIncidenciaPage from './TabOptions/CreateIncidenciaPage/CreateIncidenciaPage';
import MostrarIncidenciasPage from './TabOptions/MostrarIncidenciasPage/MostrarIncidenciasPage';


const IncidenciasPage = () => {
    const history = useHistory();
    const userRol = localStorage.userRol;

    let tabSelected;
    if (history.location.pathname.includes('show')) {
        tabSelected = 0;
        console.log(history.location.pathname);
    }
    else if (history.location.pathname.includes('create')) {
        tabSelected = 1;
        console.log(history.location.pathname);
    }

    
    let optionsList;
    if (userRol == 'supervisor') {
        optionsList = <><p>En este apartado usted podrá gestionar todas las incidencias que hayan sido resportadas y asignadas. Tendrá las siguientes opciones:</p><ul>
            <li><b>Visualizar</b> todas las incidencias</li>
            <li><b>Filtrar</b> incidencias para mejor búsqueda.</li>
            <li>Acceder a los <b>datos de una incidencia específica</b>.</li>
            <li><b>Editar</b> o <b>eliminar</b> cualquier incidencia una vez se ha accedido a sus datos.</li>
            <li><b>Visualizar</b> y <b>añadir</b> comentarios a la incidencia.</li>
        </ul></>
    }
        
    const [tabsOptions, setTabsOptions] = React.useState<TabsModel>({
        idList: ['mostrarIncidencias','crearIncidencia'],
        valuesList: ['Mostrar incidencias', 'Crear nueva incidencia'],
        color: 'grey',
        enabledList: [true, true],
        itemActive: tabSelected
    });
    

    const handleClickTab = (id: string) => {
        if (id=='crearIncidencia') {
            history.push('/home/incidencias/create');
            setTabsOptions({
                ...tabsOptions,
                itemActive: 1
            })
        } else if (id=='mostrarIncidencias') {
            history.push('/home/incidencias/show');
            setTabsOptions({
                ...tabsOptions,
                itemActive: 0
            }
            
        }
    }

        return( 
            <div className="incidencias-container">
                <div className='title-container'>
                    <p className="title">Gestor de incidencias</p>
                    <div className="descripcion">{optionsList}</div>
                </div>
                <div className="data-container">
                    <Tabs tabsInfo={tabsOptions} handleClick={handleClickTab}></Tabs>
                    <div className="dropdowndata-container">
                        <Switch>
                            <Route path="/home/incidencias/create" component={CreateIncidenciaPage}></Route>
                            <Route path="/home/incidencias/show" component={MostrarIncidenciasPage}></Route>
                        </Switch>     
                    </div>
                </div>
            </div>
        )
}

export default IncidenciasPage;