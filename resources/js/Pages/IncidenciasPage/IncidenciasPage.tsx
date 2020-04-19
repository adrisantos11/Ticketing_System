import * as ReactDOM from 'react-dom';
import * as React from 'react'
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";
import './IncidenciasPage.scss'
import { TabsModel } from '../../Model/model'
import Button from '../../Components/Button/Button';
import Tabs from '../../Components/Tabs/Tabs';
import CreateIncidenciaPage from './TabOptions/CreateIncidenciaPage/CreateIncidenciaPage';
import MostrarIncidenciasPage from './TabOptions/MostrarIncidenciasPage/MostrarIncidenciasPage';
import TechnicalGroupsPage from './TabOptions/TechnicalGroupsPage/TechnicalGroupsPage'

const IncidenciasPage = () => {
    const history = useHistory();
    const userRol = localStorage.userRol;

    let tabSelected;
    if (history.location.pathname.includes('show')) {
        tabSelected = 0;
    }
    else if (history.location.pathname.includes('create')) {
        tabSelected = 1;
    }
    else if (history.location.pathname.includes('technicalGroups')) {
        tabSelected = 2;
    }

    
    let optionsList;
    let titlePage;
    let enableTehnicalGroups = true;

    let idListTabs = ['mostrarIncidencias','crearIncidencia'];
    let valuesListTabs = ['Mis incidencias', 'Crear nueva incidencia'];
    let colorListTabs = ['grey', 'grey'];

    if (userRol == 'supervisor') {
        titlePage = 'Gestor de incidencias - Supervisor';
        idListTabs.push('technicalGroups');
        valuesListTabs.push('Mis grupos de ténicos');
        colorListTabs.push('grey');
        optionsList = <><p>En este apartado usted podrá gestionar todas las incidencias que hayan sido resportadas y asignadas. Tendrá las siguientes opciones:</p><ul>
            <li><b>Visualizar</b> todas las incidencias.</li>
            <li><b>Filtrar</b> incidencias para mejor búsqueda.</li>
            <li>Acceder a los <b>datos de una incidencia específica</b>.</li>
            <li><b>Editar</b> o <b>eliminar</b> cualquier incidencia una vez se ha accedido a sus datos.</li>
            <li><b>Visualizar</b> y <b>añadir</b> comentarios a la incidencia.</li>
        </ul></>
    } else  if (userRol == 'technical'){
        titlePage = 'Gestor de incidencias - Técnico';
        enableTehnicalGroups = false;
        optionsList = <><p>En este apartado podrá:</p><ul>
        <li><b>Visualizar</b> las incidencias asignadas a usted, a los grupos a los que pertencezca.</li>
        <li><b>Visualizar</b>, <b>editar</b> y <b>borrar</b> las incidencias creadas por usted.</li>
        <li><b>Filtrar</b> incidencias para mejor búsqueda.</li>
        <li>Acceder a los <b>datos de una incidencia específica</b>.</li>
        <li><b>Visualizar</b> y <b>añadir</b> comentarios a la incidencia.</li>
    </ul></>
    }
    
    const [tabsOptions, setTabsOptions] = React.useState<TabsModel>({
        idList: idListTabs,
        valuesList: valuesListTabs,
        color: colorListTabs,
        enabledList: [true, true, enableTehnicalGroups],
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
            })
        } else if (id=='technicalGroups') {
            history.push('/home/incidencias/technicalGroups');
            setTabsOptions({
                ...tabsOptions,
                itemActive: 2
            })
        }
    }

        return( 
            <div className="incidencias-container">
                <div className='title-container'>
                    <p className="title">{titlePage}</p>
                    <div className="descripcion">{optionsList}</div>
                </div>
                <div className="data-container">
                    <Tabs tabsInfo={tabsOptions} handleClick={handleClickTab}></Tabs>
                    <div className="dropdowndata-container">
                        <Switch>
                            <Route path="/home/incidencias/create" component={CreateIncidenciaPage}></Route>
                            <Route path="/home/incidencias/show" component={MostrarIncidenciasPage}></Route>
                            <Route path="/home/incidencias/technicalGroups" component={TechnicalGroupsPage}></Route>

                        </Switch>     
                    </div>
                </div>
            </div>
        )
}

export default IncidenciasPage;