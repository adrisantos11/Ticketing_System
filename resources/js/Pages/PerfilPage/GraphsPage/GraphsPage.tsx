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

    // Constantes para la creación de las gráficas
    const graphData: any[] = [];
    const labels: string[] = [];
    const colorsList: any[] = [];

    // Listas para las opciones de gráficas
    const idList = [];
    const valuesList = [];
    const iconList = [];

    if (userRol == 'supervisor') {
        idList.push('estado-actual-incidencias', 'comparativa-incidencias');
        valuesList.push('Estado actual', 'Comparativas');
        iconList.push('fas fa-info-circle', 'fas fa-chart-line');
    } else if (userRol == 'technical') {
        idList.push('resumen-incidencias');
        valuesList.push('Resumen incidencias');
        iconList.push("fas fa-info-circle");
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
        mainLabels: ['Mis incidencias'],
        graphData: null
    });

    const [topSizeGraph, setTopSizeGraph] = React.useState(null);

    const getEstadoActualSupervisor = () => {
        todoCount = 0;
        doingCount = 0;
        blockedCount = 0;
        doneCount = 0;
        getIncidencias(userId, userRol, 'priority').then(res => {
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
            
            graphData.push([todoCount ,doingCount, blockedCount, doneCount]);
            labels.push('Pendientes', 'En proceso', 'Bloqueadas', 'Soluciondas');
            colorsList.push(["#3685EC", "#e78738", "#dc3545", '#07a744']);

            getNoAssignedIncidencias().then(res => {
                graphData[0].push(res.length);
                labels.push('Sin asgnar');
                colorsList[0].push('#e2e2e2')
                setGraphBar({
                    ...graphBar,
                    title: 'Estado actual (Total: ' + sum + ')',
                    graphData: graphData,
                    labels: labels,
                    colorsList: colorsList
                })
            })
            setInfo('* TOTAL = Pendientes + En proceso + Bloqueadas + Solucionadas');
            setTopSizeGraph('Hola')
        });



    }

    const getResumeTechnical = () => {
        todoCount = 0;
        doingCount = 0;
        blockedCount = 0;
        doneCount = 0;
        getIncidencias(userId, userRol, 'priority').then(res => {
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
            graphData.push([todoCount ,doingCount, blockedCount, doneCount]);
            labels.push('Pendientes', 'En proceso', 'Bloqueadas', 'Soluciondas');
            colorsList.push(["#3685EC", "#e78738", "#dc3545", '#07a744']);        
            setGraphBar({
                ...graphBar,
                title: 'Estado actual (Total: ' + sum + ')',
                graphData: graphData,
                labels: labels,
                colorsList: colorsList
            })
    
            setInfo('');
            setTopSizeGraph(null)

        });
    }

    React.useEffect(() => {
        if (userRol == 'supervisor') {
            getEstadoActualSupervisor();
        } else if (userRol == 'technical'){
            getResumeTechnical()
        }
    }, []);

    
    const handleClickTab = (id: string) => {
        if (userRol == 'supervisor') {
            if (id=='estado-actual-incidencias') {
                getEstadoActualSupervisor(); 
            } else if (id=='comparativa-incidencias') {
                console.log('Comparativa');
            }
        } else if (userRol == 'technical'){
            if (id=='resumen-incidencias') {
                getResumeTechnical()
            }
        }

    }

        return (
           <div className='graphsPage-container'>
                    <Tabs tabsInfo={tabsOptions} handleClick={handleClickTab}></Tabs>
                <div className='graphs-container'>
                    {topSizeGraph}
                    <Graph graphProps={graphBar}></Graph>
                    <p className='p-info'>{info}</p>
                </div>
           </div>
        )
}

export default GraphsPage;