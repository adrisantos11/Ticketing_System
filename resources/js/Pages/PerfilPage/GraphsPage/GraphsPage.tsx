import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './GraphsPage.scss'

import Graph from '../../../Widgets/Graph/Graph'
import {GraphModel, TabsModel, AutocompleteInputModel, BasicUserModel} from '../../../Model/model';
import { getTotalIncidencias } from '../../../Utilities/Graphics/TechnicalDataGraphs';
import { useHistory, Switch, Route } from "react-router-dom";
import Tabs from '../../../Components/Tabs/Tabs';
import { getIncidencias } from '../../../Utilities/Incidencias/IncidenciasUtilities';
import { getNoAssignedIncidencias } from '../../../Utilities/Incidencias/SupervisorUtilities';
import AutocompleteInput from '../../../Components/AutocompleteInput/AutocompleteInput';

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

    const [autocompleteInputValues1, setAutocompleteInputValues1] = React.useState<AutocompleteInputModel>({
        id: 10,
        placeholderInput: 'Nombre...',
        colorInput: 'primary',
        typeInput: 'text',
        enabled: true,
        tableToSearchIn: 'users',
        matchingWords: ['name', 'surname1', 'surname2'],
        searchIn: 'users'
    })

    const [autocompleteInputValues2, setAutocompleteInputValues2] = React.useState<AutocompleteInputModel>({
        id: 11,
        placeholderInput: 'Nombre...',
        colorInput: 'primary',
        typeInput: 'text',
        enabled: true,
        tableToSearchIn: 'users',
        matchingWords: ['name', 'surname1', 'surname2'],
        searchIn: 'teams'
    })
      

    const [topSizeGraph, setTopSizeGraph] = React.useState(null);

    const [comparationUser, setComparationUser] = React.useState('')
    const [comparationTeam, setComparationTeam] = React.useState(null)
    const [userCounter, setUserCounter] = React.useState(0);
    const [openGraphController, setOpenGraphController] = React.useState(false);

    const getRandomColor = () =>  {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    const colors = ['#3685EC', '#003877', '#e78738', '#07a744', '#00254E']
    const getIncidenciasUser = (user: any) => {
        todoCount = 0;
        doingCount = 0;
        blockedCount = 0;
        doneCount = 0;
        let graphDataUser = graphBar.graphData;
        let colorsListUser = graphBar.colorsList;
        let mainLabels = graphBar.mainLabels;

        mainLabels.push(user.name + ' ' + user.surname1);
        const counter = userCounter;
        const color = getRandomColor();
        getIncidencias(user.id, user.role, 'priority').then(res => {
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

            graphDataUser.push([todoCount ,doingCount, blockedCount, doneCount]);
            colorsListUser.push([color, color, color, color]);       

            setGraphBar({
                ...graphBar,
                graphData: graphDataUser,
                colorsList: colorsListUser,
                mainLabels: mainLabels,
                labels: ['Pendientes', 'En proceso', 'Bloqueadas', 'Soluciondas']
            })
        });
        setInfo('');
    }

    const handleClickAutocomplete = (data: any, id: number) => {
        if (id == 10) {
            if (data.role == 'technical') {
                setComparationUser(data)
            }
        } else if (id == 11) {
        }
    }

    React.useEffect(() => {
        getIncidenciasUser(comparationUser);
        setUserCounter(userCounter+1)
    }, [comparationUser])

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
                    colorsList: colorsList,
                    mainLabels: ['Mis incidencias']          
                })
            })
            setInfo('* TOTAL = Pendientes + En proceso + Bloqueadas + Solucionadas');
            setTopSizeGraph(null)
        });
    }

    const compareTechnicalGraphs = () => {
        setGraphBar({
            ...graphBar,
            title: 'Gráfica comparativa',
            labels: ['Pendientes', 'En proceso', 'Bloqueadas', 'Soluciondas'],
            graphData: [],
            colorsList: [],
            mainLabels: [],
        })

        setTopSizeGraph(<>
        <div className="topsize-container">
            <span className="title-autocomplete">Añadir usuario</span>
            <AutocompleteInput autocompleteInputInfo={autocompleteInputValues1} handleClick={handleClickAutocomplete}></AutocompleteInput>
        </div>
        </>)

        setInfo('');
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
            } else if (id == 'comparativa-incidencias') {
                compareTechnicalGraphs();
            }
        } else if (userRol == 'technical'){
            if (id == 'resumen-incidencias') {
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