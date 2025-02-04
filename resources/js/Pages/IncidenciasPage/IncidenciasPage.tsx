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
    const sreenWidth = screen.width; 
    
    const [tabSelected, setTabSelected] = React.useState(0);

    let optionSelected = 0;
    if (history.location.pathname.includes('show')) {
        optionSelected=0;
    }
    else if (history.location.pathname.includes('create')) {
        optionSelected=1;
    }
    else if (history.location.pathname.includes('technicalGroups')) {
        optionSelected=2;
    }

    let optionsList;
    let titlePage;
    let enableTehnicalGroups = true;

    let idListTabs = ['mostrarIncidencias','crearIncidencia'];
    let valuesListTabs = ['Mis incidencias', 'Crear nueva incidencia'];
    let colorListTabs = ['grey', 'grey'];
    let iconList = [];

    if (userRol == 'supervisor') {
        
        titlePage = 'Gestor de incidencias - Supervisor';
        idListTabs.push('technicalGroups');
        valuesListTabs.push('Mis grupos de ténicos');
        colorListTabs.push('grey');
        optionsList = <><p>En este apartado usted podrá gestionar todas las incidencias que hayan sido resportadas y asignadas. Tendrá las siguientes opciones:</p><ul>
            <li><b>Visualizar</b> todas las incidencias.</li>
            <li><b>Filtrar</b> incidencias para una mejor búsqueda.</li>
            <li>Acceder a los <b>datos de una incidencia específica</b>.</li>
            <li><b>Editar</b> o <b>eliminar</b> cualquier incidencia una vez se ha accedido a sus datos.</li>
            <li><b>Visualizar</b> y <b>añadir</b> comentarios a la incidencia.</li>
        </ul></>
        if (sreenWidth <= 550) {
            iconList.push('fas fa-list', 'fas fa-plus-circle', 'fas fa-users');
            valuesListTabs = []
        }
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

        if (sreenWidth <= 550) {
            iconList.push('fas fa-list', 'fas fa-plus-circle');
            valuesListTabs = []
        }
    }

    
    
    const [tabsOptions, setTabsOptions] = React.useState<TabsModel>({
        idList: idListTabs,
        valuesList: valuesListTabs,
        iconList: iconList,
        color: colorListTabs,
        enabledList: [true, true, enableTehnicalGroups],
        itemActive: optionSelected
    });

    React.useEffect(() => {
        if (history.location.pathname.includes('show')) {
            setTabsOptions({
                ...tabsOptions,
                itemActive: 0
            })
        }
        else if (history.location.pathname.includes('create')) {
            setTabsOptions({
                ...tabsOptions,
                itemActive: 1
            })        
        }
        else if (history.location.pathname.includes('technicalGroups')) {
            setTabsOptions({
                ...tabsOptions,
                itemActive: 2
            })
        }
    }, []);

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