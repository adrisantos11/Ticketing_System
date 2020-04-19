import * as React from 'react'
import './MostrarIncidenciasPage.scss'
import { DropdownModel, SelectboxModel } from '../../../../Model/model'
import Dropdown from '../../../../Components/Dropdown/Dropdown';
import Selectbox from '../../../../Components/Selectbox/SelectBox';
import { Link } from 'react-router-dom';

import { getNoAssignedIncidencias } from '../../../../Utilities/Incidencias/SupervisorUtilities'
import { getAssignedIncidencias, getGroupIncidencias } from '../../../../Utilities/Incidencias/TechnicalUtilities'

import { getIncidencias, getFilteredIncidencias } from '../../../../Utilities/Incidencias/IncidenciasUtilities'

import { getFilters } from '../../../../Utilities/Incidencias/IncidenciasUtilities'

const MostrarIncidenciasPage = () => {

    const [incidenciasLoaded, setIncidenciasLoaded] = React.useState(false);
    const [incidencias, setIncidencias] = React.useState([]);
    const userRol = localStorage.userRol;
    const [orderBy, setOrderBy] = React.useState('');
    const headerList = ['Id', 'Nombre', 'Descripción', 'Categoría', 'Prioridad','Estado','Fecha límite', '¿Asignada?', 'Tiempo transcurrido desde su creación']

    let date = new Date();
    let hoursMinutesSeconds = date.toLocaleString().split(' ');
    let actualDate = new Date(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + hoursMinutesSeconds[1]);

    const user = {
        id: localStorage.userId
    }

    let dropdownItems = ['Prioridad', 'Fecha límite', 'Estado', 'Categoría', 'ID', 'Creadas por mi'];
    let dropdownIds = ['priority', 'limit_date', 'state', 'category', 'id', 'created_by_me'];
    if (userRol == 'supervisor') {
        dropdownItems.push('Sin asignar');
        dropdownIds.push('no_assigned');
    } else if(userRol == 'technical') {
        dropdownItems.splice(0,0,'Mis incidencias', 'Incidencias grupales');
        dropdownIds.splice(0,0,'my_incidencias', 'group_incidencias');
    }

    // Datos con los que se va a cargar el dropdown con las opción de ordenación de las incidencias.
    const [orderByDropdown, setOrderByDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: "Seleccionar...",
        groupItems: dropdownItems,
        groupIds: dropdownIds,
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const drawFooter = (orderBy: string, sizesList: any[], colorsList: any[]) => {
        let helperList: { value: any; count: any; }[] = [];
        /**
         * En el caso en el que orderBy sea 'priority', 'category' o 'state', mandamos mapear el objeto de 'sizes' del resultado
         * y se hace recuento de la cantidad de incidencias que hay dentro de cada tipo dentro de la categoría.
         * 
         * -------------------- EJEMPLO --------------------
         * Si la categoría es 'priority', se hace recuento de la incidencias que hay en:
         *      - Critial
         *      - Important
         *      - Trivial
         * -------------------------------------------------
         * Para ello se hace uso de una lista auxiliar en la que se iran guadando los tipos devueltos y la cantidad.
         * En el caso en el que el tipo no exista en la lista, se añáde. Si existe, se añade uno al contador de ese tipo.
         */
        if (orderBy == 'priority' || orderBy == 'category' || orderBy == 'state') {
            sizesList.map((element: { value: any; count: any;}) => {
                const i = helperList.map((value: { value: any;}) => {
                    return value.value
                }).indexOf(element.value);
                if (i == -1) {
                    helperList.push(element);
                } else {
                    helperList[i].count = helperList[i].count+element.count;
                }
            })

            /**
             * Se recorre la lista auxiliar creada para visualizar los datos obtenidos de todos los tipos de la categoría.
             * Para ello se crea un footer con el nombre del tipo y la cantidad de incidencias coincidentes con el tipo.
             */
            helperList.map((value, index) => {
                setDivSelectedData(divSelectedData => [
                    ...divSelectedData,
                    <React.Fragment key={index}><div className="vertical-separator"></div><div className='dataSelection-container--filter'><b>{`${value.value
                        }: `}</b><span className={`span--${colorsList[index]}`}>{value.count}</span></div></React.Fragment>
                    ]);

            })
        }    

    }

    const [incidenciasSize, setIncidenciasSize] = React.useState(0);
    /**
     * Función que obtiene las incidencias asociadas al usuario que ha iniciado sesión.
     * @param user objeto que contiene el id del usuario.
     * @param orderBy String que indentifica en qué orden se tiene que extraer las incidencias de la BBDD.
     */
    const getIncidenciasUser = (user: any, orderBy: string) => {
        setDivSelectedData([]);
        if (userRol == 'technical') {
            // En el caso en el que orderBy esté vacío, mandamos que se obtengan las incidencias ordenads por 'Prioridadd'
            if(orderBy == '') {
                getIncidencias(user, userRol, 'priority').then(res => {
                    setIncidenciasSize(res.data.length);
                    setIncidencias(res.data);
                    drawFooter('priority', res.sizes, res.colors);
                });
            } else if (orderBy == 'my_incidencias') {
                getAssignedIncidencias(user.id).then(res => {
                    setIncidenciasSize(res.length);
                    setIncidencias(res);
                });
            } else if (orderBy == 'group_incidencias') {
                    getGroupIncidencias(user.id).then(res => {
                    setIncidenciasSize(res.length);
                    setIncidencias(res);
                });
            } else {
                getIncidencias(user, userRol, orderBy).then(res => {
                    setIncidenciasSize(res.data.length);
                    setIncidencias(res.data);
                    drawFooter(orderBy, res.sizes, res.colors);
                });
            }
        } else if (userRol == 'supervisor'){
            // En el caso en el que orderBy esté vacío, se manda obtener las incidencias ordenads por 'Prioridadd'
            if(orderBy == '') {
                getIncidencias(user, userRol, 'priority').then(res => {
                    setIncidenciasSize(res.data.length);
                    setIncidencias(res.data);
                    drawFooter('priority', res.sizes, res.colors);
                });
            } else if (orderBy == 'no_assigned') {
                getNoAssignedIncidencias(user).then(res => {
                    setIncidenciasSize(res.length);
                    setIncidencias(res);
                });
            } else {
                getIncidencias(user, userRol, orderBy).then(res => {
                    setIncidenciasSize(res.data.length);
                    setIncidencias(res.data);
                    drawFooter(orderBy, res.sizes,res.colors);
                })

            }
        }
    }

    React.useEffect(() => {
        getIncidenciasUser(user, orderBy);
        setIncidenciasLoaded(true);
    }, [orderBy]);

    const [selectboxList, setSelectboxList] = React.useState<SelectboxModel[]>([]);
    const [divSelectedData, setDivSelectedData] = React.useState([]);
    const [idSelectboxList, setIdSelectboxList] = React.useState([])

    const handleClickItemDD = (idItem: string, idDropdown: number) => {
        // setIdSelectboxList([]);
        setOrderBy(idItem);
        setSelectboxList([]);
        getFilters().then(res => {
            if(idItem == 'priority') {
                setDivSelectedData([]);
                res.priority.map((value: any) => {
                    const selectboxData = {
                        active: value.active,
                        name: value.name,
                        id: value.id,
                        color: value.color
                    }
                    setSelectboxList(selectboxList => [
                        ...selectboxList,
                        selectboxData
                    ])
                })
            } else if(idItem == 'state') {
                setDivSelectedData([]);
                res.state.map((value: any) => {
                    const selectboxData = {
                        active: value.active,
                        name: value.name,
                        id: value.id,
                        color: value.color
                    }
                    setSelectboxList(selectboxList => [
                        ...selectboxList,
                        selectboxData
                    ])
                })
            } else if(idItem == 'category') {
                setDivSelectedData([]);
                res.category.map((value: any) => {
                    const selectboxData = {
                        active: value.active,
                        name: value.name,
                        id: value.id,
                        color: value.color
                    }
                    setSelectboxList(selectboxList => [
                        ...selectboxList,
                        selectboxData
                    ])
                })
            }

            
        });
    }

    const handleClickSelectedbox = (idSelectbox: string, color: string) => {
        const i = idSelectboxList.indexOf(idSelectbox);
        let helperList = idSelectboxList;
        if (i == -1) {
            helperList.push(idSelectbox)
            setIdSelectboxList(helperList)
        } else {
            helperList.splice(i, 1);
            setIdSelectboxList(helperList);
        }
        if(helperList.length != 0) {
            getFilteredIncidencias(user.id, userRol,  orderBy, helperList).then(res => {
                setIncidenciasSize(res.length);
                setIncidencias(res);
            })
        } else {
            getIncidencias(user, userRol, orderBy).then(res => {
                setIncidenciasSize(res.length);
                setIncidencias(res.data);
            })
        }
    }

    const getDateDifference = (date1: Date, date2: Date) => {
        const days = Math.floor((((date1.getTime()-date2.getTime())/1000)/3600)/24);
        let hours = Math.floor((((date1.getTime()-date2.getTime())/1000)/3600)%24);
        let mins = Math.floor(hours%60);
        let daysData;
        let hoursData;
        if (days == 0 && hours==0) {
            console.log('Hola');
            mins = Math.floor((((date1.getTime()-date2.getTime())/1000)/60));
            console.log(mins);
        }
        if (days != 0) {
            daysData = <><b>{days}</b> días - </>
        } else {
            daysData = '';
            hours = Math.floor(((date1.getTime()-date2.getTime())/1000)/3600);
        }

        if (hours != 0) {
            hoursData = <><b>{hours}</b> horas - </>
        } else {
            hoursData = '';
        }
        return (
        <>{daysData}{hoursData}<b>{mins}</b> minutos</>
        )
    }

    if(incidenciasLoaded && userRol=='supervisor') {
        return (
            <>
            <div className="incidenciasList-container">
                <div className="header-container">
                    <div className="filtrar-container">
                        Ordenar por:
                        <Dropdown dropdownInfo={orderByDropdown} onClick={handleClickItemDD}></Dropdown>
                        <div className="vertical-separator"></div>
                        <div className="selectboxes-container">
                            Filtrar por:
                            {
                                selectboxList.map((value, index) => {
                                    return(
                                        <Selectbox key={index} selectboxInfo={value} handleClickSelectbox={handleClickSelectedbox}></Selectbox>
                                    )
                                })
                            }

                        </div>

                    </div>
                    {/* <div className="horizontal-separator"></div> */}
                    <div className='footer-container'>
                        <div className="dataSelection-container"><span >Nº total de incidencias filtradas: <b>{incidenciasSize}</b></span></div>
                        {
                            divSelectedData
                        }
                    </div>
                    <div className="tableHeaders-container">
                        <div className="header--id_Supervisor">{headerList[0]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--name_Supervisor">{headerList[1]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--description_Supervisor">{headerList[2]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--category_Supervisor">{headerList[3]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--priority_Supervisor">{headerList[4]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--state_Supervisor">{headerList[5]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--limitDate_Supervisor">{headerList[6]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--assigned_Supervisor">{headerList[7]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--creationTime_Supervisor">{headerList[8]}</div>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table" id='dataTable'>
                        <tbody>
                            {
                                incidencias.map((element, index) => {
                                    let priorityText='';
                                    let priorityColor='';
                                    
                                    let isAssigned = 'SI';
                                    if (element.id_assigned == null && element.id_team == null) {
                                        isAssigned = 'NO';
                                    }
                                    if (element.priority == 'critical') {
                                        priorityColor = '--red';
                                        priorityText = 'crítica';
    
                                    } else if(element.priority == 'important') {
                                        priorityColor = '--orange';
                                        priorityText = 'importante';
    
                                    } else {
                                        priorityColor = '--green'
                                        priorityText = 'trivial';
                                    }

                                    let state;
                                    let stateColor = '';
                                    if (element.state == 'todo') {
                                        state = 'Pendiente';
                                        stateColor = '--bg-primary';
                                    } else if (element.state == 'doing') {
                                        state = 'En proceso';
                                        stateColor = '--bg-orange';
                                    } else if (element.state == 'blocked') {
                                        state = 'Bloqueado';
                                        stateColor = '--bg-red';
                                    } else if (element.state == 'done') {
                                        state = 'Solucionado';
                                        stateColor = '--bg-green';
                                    }
                                    
                                    let description;
                                    if (element.description.length > 90) {
                                        description = element.description.substr(0, 90) + '...';
                                    } else {
                                        description = element.description;
                                    }

                                    let limit_date = 'limitDate-column';
                                    let date_column = ''
                                    if (element.limit_date == null) {
                                        limit_date = '--';
                                        date_column = 'limitDate-column--red';
                                    } else {
                                        limit_date = element.limit_date;
                                    }

                                    const incidenciaLimitDate = new Date(element.creation_date);
                                    // let timeOpen = actualDate.getDate()-incidenciaLimitDate.getDate();
                                    return(
                                    <tr key={index}>
                                        <th scope="row" className='id-column'>{`#${element.id}`}</th>
                                        <td className='name-column'><Link to={`/home/incidencia-view/${element.id}/comments`} data-toogle="tooltip" data-placement="top" title={`Incidencia ${element.id}`}><b>{element.title}</b></Link></td>
                                        <td className='description-column'>{description}</td>
                                        <td className='category-column'>{element.category}</td>
                                        <td className={`priority-column columna${priorityColor}`}>{priorityText}</td>
                                        <td className={`state-column columna${stateColor}`}>{state}</td>
                                        <td className={date_column}>{limit_date}</td>
                                        <td className='assigned-column'>{isAssigned}</td>
                                        <td className='creationTime-column'>{getDateDifference(actualDate, incidenciaLimitDate)}</td>
                                    </tr>
                                    )
                                }) 
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        )
        } else if (incidenciasLoaded && userRol=='technical') {
            return (
                <>
                <div className="incidenciasList-container">
                    <div className="header-container">
                        <div className="filtrar-container">
                            <Dropdown dropdownInfo={orderByDropdown} onClick={handleClickItemDD}></Dropdown>
                            <div className="vertical-separator"></div>
                            <div className="selectboxes-container">
                                Filtrar por:
                                {
                                    selectboxList.map(value => {
                                        return(
                                            <Selectbox selectboxInfo={value} handleClickSelectbox={handleClickSelectedbox}></Selectbox>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <div className="horizontal-separator"></div>
                        <div className='footer-container'>
                            <div className="dataSelection-container"><span >Nº total de incidencias filtradas: <b>{incidenciasSize}</b></span></div>
                            {
                                divSelectedData
                            }
                        </div>
                    <div className="tableHeaders-container">
                        <div className="header--id_Technical">{headerList[0]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--name_Technical">{headerList[1]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--description_Technical">{headerList[2]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--category_Technical">{headerList[3]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--priority_Technical">{headerList[4]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--state_Technical">{headerList[5]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--limitDate_Technical">{headerList[6]}</div>
                        <div className="vertical-separator2"></div>
                        <div className="header--creationTime_Technical">{headerList[8]}</div>
                    </div>
                    </div>
                    <div className="table-container">
                        <table className="table" id='dataTable'>
                            <tbody>
                                {
                                    incidencias.map((element, index) => {
                                        let priorityText='';
                                        let priorityColor='';
                                    
                                        if (element.priority == 'critical') {
                                            priorityColor = '--red';
                                            priorityText = 'crítica';
        
                                        } else if(element.priority == 'important') {
                                            priorityColor = '--orange';
                                            priorityText = 'importante';
        
                                        } else {
                                            priorityColor = '--green'
                                            priorityText = 'trivial';
                                        }

                                        let state;
                                        let stateColor = '';
                                        if (element.state == 'todo') {
                                            state = 'Pendiente';
                                            stateColor = '--bg-primary';
                                        } else if (element.state == 'doing') {
                                            state = 'En proceso';
                                            stateColor = '--bg-orange';
                                        } else if (element.state == 'blocked') {
                                            state = 'Bloqueado';
                                            stateColor = '--bg-red';
                                        } else if (element.state == 'done') {
                                            state = 'Solucionado';
                                            stateColor = '--bg-green';
    
                                        }

                                        let description;
                                        if (element.description.length > 90) {
                                            description = element.description.substr(0, 90) + '...';
                                        } else {
                                            description = element.description;
                                        }

                                        const incidenciaLimitDate = new Date(element.creation_date);

                                        return(
                                        <tr key={index}>
                                            <th scope="row" className='id-column--technical'>{`#${element.id}`}</th>
                                            <td className='name-column--technical'><Link to={`/home/incidencia-view/${element.id}/comments`} data-toogle="tooltip" data-placement="top" title={`Incidencia ${element.id}`}><b>{element.title}</b></Link></td>
                                            <td className='description-column--technical'>{description}</td>
                                            <td className='category-column--technical'>{element.category}</td>
                                            <td className={`priority-column--technical columna${priorityColor}`}>{priorityText}</td>
                                            <td className={`state-column--technical columna${stateColor}`}>{state}</td>
                                            <td className='limitDate-column--technical'>{element.limit_date}</td>
                                            <td className='creationTime-column--technical'>{getDateDifference(actualDate, incidenciaLimitDate)}</td>

                                        </tr>
                                        )
                                    }) 
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                </>
            )
    
        } else {
            return(
                <div>
                    No se han cargado las incidencias.
                </div>
            )
    }
}

export default MostrarIncidenciasPage;