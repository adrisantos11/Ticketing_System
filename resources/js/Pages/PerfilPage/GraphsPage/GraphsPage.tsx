import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './GraphsPage.scss'

import Graph from '../../../Widgets/Graph/Graph'
import {GraphModel, TabsModel} from '../../../Model/model';
import { getTotalIncidencias } from '../../../Utilities/Graphics/TechnicalDataGraphs';
import { useHistory, Switch, Route } from "react-router-dom";
import Tabs from '../../../Components/Tabs/Tabs';
import { getIncidencias } from '../../../Utilities/Incidencias/IncidenciasUtilities';
import { getNoAssignedIncidencias } from '../../../Utilities/Incidencias/SupervisorUtilities';

const GraphsPage = () => {
    const userId = localStorage.userId;
    const userRol = localStorage.userRol;
    const history = useHistory();
    let todoCount = 0;
    let doingCount = 0;
    let blockedCount = 0;
    let doneCount = 0;


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

    const [info, setInfo] = React.useState('');
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
        labels: [],
        colorsList: [],
        mainLabel: 'Mis incidencias',
        graphData: null
    });

    const getEstadoActualSupervisor = () => {
        todoCount = 0;
        doingCount = 0;
        blockedCount = 0;
        doneCount = 0;
        const graphData: number[] = [];
        const labels: string[] = [];
        const colorsList: string[] = [];
        getIncidencias(userId, userRol, 'priority').then(res => {
            console.log(res.data.length);
            res.data.map((data: { state: any; }) => {
                switch (data.state) {
                    case 'todo':
                        todoCount++;
                        break;
                    case 'doing':
                        doingCount++;
                        break;
                    case 'blocked':
                        blockedCount++;
                        break;
                    case 'done':
                        doneCount++;
                        break;
                    default:
                        break;
                }

            })
            const sum = todoCount+doingCount+blockedCount+doneCount;
            
            graphData.push(todoCount ,doingCount, blockedCount, doneCount);
            labels.push('Pendientes', 'En proceso', 'Bloqueadas', 'Soluciondas');
            colorsList.push("#3685EC", "#e78738", "#dc3545", '#07a744');

            getNoAssignedIncidencias().then(res => {
                graphData.push(res.length);
                labels.push('Sin asgnar');
                colorsList.push('#e2e2e2')
                setGraphBar({
                    ...graphBar,
                    title: 'Estado actual (Total: ' + sum + ')',
                    graphData: graphData,
                    labels: labels,
                    colorsList: colorsList
                })
            })
            setInfo('* TOTAL = Pendientes + En proceso + Bloqueadas + Solucionadas');
        });



    }

    React.useEffect(() => {
        if (userRol == 'supervisor') {
            getEstadoActualSupervisor();
        } else if (userRol == 'technical'){
            setGraphBar({
                ...graphBar,
                labels: ['Pendientes', 'En proceso', 'Bloqueadas',]
            })
        }
    }, []);

    const getGraphData = (id: string) => {
        if (userRol == 'supervisor') {
            if(id == 'estado-actual-incidencias') {
                getEstadoActualSupervisor();   
            }
        } else if (userRol == 'technical') {
            if (id == 'resumen-incidencias') {
                getTotalIncidencias(userId).then(res => {
                    const sum = res[0].total+res[1].total+res[2].total;
                    setGraphBar({
                        ...graphBar,
                        title: 'Resumen de incidencias (Total: '+sum+')',
                        graphData: [res[0].total,res[1].total,res[2].total],
                        colorsList: [
                            "#3685EC",
                            "#e78738",
                            "#dc3545",
                        ]
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
                    <p className='p-info'>{info}</p>
                </div>
           </div>
        )
}

export default GraphsPage;