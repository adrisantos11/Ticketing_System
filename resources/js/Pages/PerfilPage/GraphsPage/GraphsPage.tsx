import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './GraphsPage.scss'

import Graph from '../../../Widgets/Graph/Graph'
import {GraphModel, TabsModel} from '../../../Model/model';
import { getTotalIncidencias } from '../../../Utilities/Graphics/TechnicalDataGraphs';
import { useHistory, Switch, Route } from "react-router-dom";
import Tabs from '../../../Components/Tabs/Tabs';
import { getIncidencias } from '../../../Utilities/Incidencias/IncidenciasUtilities';

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
        console.log('Hola');
        todoCount = 0;
        doingCount = 0;
        blockedCount = 0;
        doneCount = 0;
        getIncidencias(userId, userRol, 'state').then(res => {
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
            console.log()
            setGraphBar({
                ...graphBar,
                title: 'Estado actual (Total: '+sum+')',
                graphData: [todoCount ,doingCount, blockedCount, doneCount],
                labels: ['Pendientes', 'En proceso', 'Bloqueadas', 'Soluciondas'],
                colorsList: [
                    "#3685EC",
                    "#e78738",
                    "#dc3545",
                    '#07a744'
                ]
            })
        })

    }

    React.useEffect(() => {
        if (userRol == 'supervisor') {
            console.log(34253);
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
                setGraphBar({
                    ...graphBar,
                    labels: ['Pendientes', 'En proceso', 'Bloqueadas', 'Soluciondas'],
                    colorsList: [
                        "#3685EC",
                        "#e78738",
                        "#dc3545",
                        '#07a744'
                    ]
                })
                
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
                </div>
           </div>
        )
}

export default GraphsPage;