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

    const [tabsOptions] = React.useState<TabsModel>({
        idList: ['mostrarIncidencias','crearIncidencia'],
        valuesList: ['Mostrar incidencias', 'Crear nueva incidencia'],
        color: '--grey',
        enabledList: [true, true]
    });
    

    const handleClickTab = (id: string) => {
        if (id=='crearIncidencia') {
            history.push('/home/incidencias/create');
        } else if (id=='mostrarIncidencias') {
            history.push('/home/incidencias/show');
            
        }
    }

        return( 
            <div className="incidencias-container">
                <div className='title-container'>
                    <p className="title">Gestor de incidencias</p>
                    <p className="descripcion">En este apartado usted podrá gestionar todas las incidencias que hayan sido resportadas y asignadas.</p>
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