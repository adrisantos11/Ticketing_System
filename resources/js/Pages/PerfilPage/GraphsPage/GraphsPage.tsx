import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './GraphsPage.scss'

import Graph from '../../../Widgets/Graph/Graph'
import {GraphModel, TabsModel} from '../../../Model/model';
import { getTotalIncidencias } from '../../../Utilities/Graphics/TechnicalDataGraphs';
import { useHistory, Switch, Route } from "react-router-dom";
import Tabs from '../../../Components/Tabs/Tabs';

const GraphsPage = () => {
    const userId = localStorage.userId;
    const userRol = localStorage.userRol;
    const history = useHistory();

    // let tabSelected = 0;
    // if (history.location.pathname.endsWith('praphs'))
    //     tabSelected = 0;
    // else if (history.location.pathname.endsWith('settings')) 
    //     tabSelected = 1;
    const idList = [];
    const valuesList = [];
    const iconList = [];
    if (userRol == 'supervisor') {
        idList.push('estado-actual-incidencias', 'evolucion-incidencias');
        valuesList.push('Estado actual', 'Evolución incidencias');
        iconList.push('fas fa-info-circle', 'fas fa-chart-line');
    } else if (userRol == 'technical') {
        idList.push('resumen-incidencias', 'historial-incidencias');
        valuesList.push('Resumen incidencias', 'Historial incidencias');
        iconList.push("fas fa-info-circle", 'fas fa-history');
    }
    const [tabsOptions, setTabsOptions] = React.useState<TabsModel>({
        idList: idList,
        valuesList: valuesList,
        iconList: iconList,
        color: ['primary', 'primary'],
        enabledList: [true, true],
        itemActive: 0
    });

    const [graphBar, setGraphBar] = React.useState<GraphModel>({
        title: 'Cargando incidencias',
        type: 'bar',
        labels: ['Pendientes', 'En proceso', 'Bloqueadas'],
        colorsList: [
                "#3685EC",
                "#e78738",
                "#dc3545",
            ],
        mainLabel: 'Mis incidencias',
        graphData: null
    });

    const getGraphData = (id: string) => {
        if (userRol == 'supervisor') {
            
        } else if (userRol == 'technical') {
            if (id == 'resumen-incidencias') {
                getTotalIncidencias(userId).then(res => {
                    const sum = res[0].total+res[1].total+res[2].total;
                    setGraphBar({
                        ...graphBar,
                        title: 'Resumen de incidencias (Total: '+sum+')',
                        graphData: [res[0].total,res[1].total,res[2].total]
                    })
                })         
            } 
        }

    }
    
    const handleClickTab = (id: string) => {
        getGraphData(id);
        if (id=='resumen-incidencias') {
            history.push('/home/perfil/graphs/summaryIncidencias');
        } else if (id=='historial-incidencias') {
            history.push('/home/perfil/graphs/historyIncidencias');
        }
    }

    React.useEffect(() => {
        if (localStorage.userRol == 'technical') {
            getGraphData('resumen-incidencias')
        } else if (localStorage.userRol == 'supervisor') {
            console.log('Hola');
        }
    }, []);

        return (
           <div className='graphsPage-container'>
                    <Tabs tabsInfo={tabsOptions} handleClick={handleClickTab}></Tabs>
                <div className='graphs-container'>
                    <Switch>
                        <Route path="/home/perfil/graphs/summaryIncidencias"><Graph graphProps={graphBar}></Graph></Route>
                        <Route path="/home/perfil/graphs/historyIncidencias">Historial</Route>
                    </Switch> 
                </div>
           </div>
        )
}

export default GraphsPage;