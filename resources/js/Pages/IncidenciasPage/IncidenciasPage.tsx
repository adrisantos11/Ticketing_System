import * as ReactDOM from 'react-dom';
import * as React from 'react'
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";
import './IncidenciasPage.scss'
import { ButtonModel, InputModel, DropdownModel, TabsModel } from '../../Model/model'
import Button from '../../Components/Button/Button';
import Tabs from '../../Components/Tabs/Tabs';
import CreateIncidenciaPage from './TabsOptions/CreateIncidenciaPage/CreateIncidenciaPage';
import MostrarIncidenciasPage from './TabsOptions/MostrarIncidenciasPage/MostrarIncidenciasPage';


const IncidenciasPage = () => {
    const history = useHistory();

    const [tabsOptions] = React.useState<TabsModel>({
        idList: ['mostrarIncidencias','crearIncidencia'],
        valuesList: ['Mostrar incidencias', 'Crear nueva incidencia'],
        color: '',
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
            <div>
                <Tabs tabsInfo={tabsOptions} handleClick={handleClickTab}></Tabs>
                <div className="table-container">
                    <Switch>
                        <Route path="/home/incidencias/create" component={CreateIncidenciaPage}></Route>
                        <Route path="/home/incidencias/show" component={MostrarIncidenciasPage}></Route>
                    </Switch>
                </div>
            </div>
        )
}

export default IncidenciasPage;