import * as React from 'react'
import './MostrarIncidenciasPage.scss'
import { DropdownModel, SelectboxModel } from '../../../../Model/model'
import Dropdown from '../../../../Components/Dropdown/Dropdown';
import Selectbox from '../../../../Components/Selectbox/SelectBox';
import { Link } from 'react-router-dom';

import { getTechnicalIncidencias } from '../../../../Utilities/Incidencias/TechnicalUtilities'
import { getSupervisorIncidencias, getSupervisorFilteredIncidencias } from '../../../../Utilities/Incidencias/SupervisorUtilities'

import { getFilters } from '../../../../Utilities/Incidencias/IncidenciasUtilities'

const MostrarIncidenciasPage = () => {
    const [incidenciasLoaded, setIncidenciasLoaded] = React.useState(false);
    const [incidencias, setIncidencias] = React.useState([]);
    let priorityText='';
    let priorityColor='';
    const userRol = localStorage.userRol;
    const [orderBy, setOrderBy] = React.useState('priority');
    const headerList = ['Id', 'Nombre', 'Descripción', 'Categoría', 'Prioridad','Estado','Fecha límite', '¿Asignada?']

    const user = {
        id: localStorage.userId
    }

    let dropdownItems = ['Prioridad', 'Fecha límite', 'Estado', 'Categoría', 'ID', 'Creadas por mi'];
    let dropdownIds = ['priority', 'limit_date', 'state', 'category', 'id', 'created_by_me'];
    if (userRol == 'supervisor') {
        dropdownItems.push('Sin asignar');
        dropdownIds.push('no_assigned');
    } 

    
    const [adminDropdown, setAdminDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: "Ordenar por...",
        groupItems: dropdownItems,
        groupIds: dropdownIds,
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [incidenciasSize, setIncidenciasSize] = React.useState(0);
    const getIncidenciasUser = (user: any, orderBy: string) => {
        setDivSelectedData([]);
        if (userRol == 'technical') {
            getTechnicalIncidencias(user, orderBy).then(res => {
                setIncidenciasSize(res.length);
                setIncidencias(res.data);
            })
        } else if (userRol == 'supervisor'){
            getSupervisorIncidencias(user, orderBy).then(res => {
                setIncidenciasSize(res.data.length);
                console.log(res.data);
                setIncidencias(res.data);
                if (orderBy == 'priority' || orderBy == 'category' || orderBy == 'state') {
                    let index = 0;
                    res.sizes.map(function(value: any) {
                        console.log(value.value);
                        setDivSelectedData(divSelectedData => [
                            ...divSelectedData,
                            <React.Fragment key={index}><div className="vertical-separator"></div><div className='dataSelection-container--filter'><b>{`${value.value
                                }: `}</b><span className={`span--${res.colors[index]}`}>{value.count}</span></div></React.Fragment>
                        ]);
                        index++;
                    }) 
                }    
            })
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
        console.log(selectboxList);
    }

    const handleClickSelectedbox = (idSelectbox: string, color: string) => {
        console.log(idSelectbox);
        console.log(orderBy);
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
            getSupervisorFilteredIncidencias(user.id, orderBy, helperList).then(res => {
                setIncidenciasSize(res.length);
                setIncidencias(res);
            })
        } else {
            getSupervisorIncidencias(user, orderBy).then(res => {
                setIncidenciasSize(res.length);
                setIncidencias(res);
            })
        }
    }

    if(incidenciasLoaded && userRol=='supervisor') {
        return (
            <>
            <div className="incidenciasList-container">
                <div className="filtrar-container">
                    Ordenar por: 
                    <Dropdown dropdownInfo={adminDropdown} onClick={handleClickItemDD}></Dropdown>
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
                <div className="table-container">
                    <table className="table" id='dataTable'>
                        <thead>
                            <tr>
                                <th scope="col">{headerList[0]}</th>
                                <th scope="col">{headerList[1]}</th>
                                <th scope="col">{headerList[2]}</th>
                                <th scope="col">{headerList[3]}</th>
                                <th scope="col">{headerList[4]}</th>
                                <th scope="col">{headerList[5]}</th>
                                <th scope="col">{headerList[6]}</th>
                                <th scope="col">{headerList[7]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                incidencias.map((element, index) => {
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
                                    return(
                                    <tr key={index}>
                                        <th scope="row">{`#${element.id}`}</th>
                                        <td><Link to={`/home/incidencia-view/${element.id}/comments`} data-toogle="tooltip" data-placement="top" title={`Incidencia ${element.id}`}><b>{element.title}</b></Link></td>
                                        <td>{element.description}</td>
                                        <td>{element.category}</td>
                                        <td className={`columna-prioridad${priorityColor}`}>{priorityText}</td>
                                        <td>{element.state}</td>
                                        <td>{element.limit_date}</td>
                                        <td>{isAssigned}</td>
                                    </tr>
                                    )
                                }) 
                            }
                        </tbody>
                    </table>
                </div>
                <div className='footer-container'>
                    {/* <p className='title-footer'>Datos de la selección</p> */}
                    <div className="dataSelection-container"><span >Nº total de incidencias filtradas: <b>{incidenciasSize}</b></span></div>
                    {
                        divSelectedData
                    }
                </div>
            </div>
            </>
        )
        } else if (incidenciasLoaded && userRol=='technical') {
            return (
                <>
                <div className="incidenciasList-container">
                    <div className="filtrar-container">
                        <Dropdown dropdownInfo={adminDropdown} onClick={handleClickItemDD}></Dropdown>
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
                    <div className="table-container">
                        <table className="table" id='dataTable'>
                            <thead>
                                <tr>
                                <th scope="col">{headerList[0]}</th>
                                <th scope="col">{headerList[1]}</th>
                                <th scope="col">{headerList[2]}</th>
                                <th scope="col">{headerList[3]}</th>
                                <th scope="col">{headerList[4]}</th>
                                <th scope="col">{headerList[5]}</th>
                                <th scope="col">{headerList[6]}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    incidencias.map((element, index) => {
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
                                        return(
                                        <tr key={index}>
                                            <th scope="row">{`#${element.id}`}</th>
                                            <td><Link to={`/home/incidencia-view/${element.id}/comments`} data-toogle="tooltip" data-placement="top" title={`Incidencia ${element.id}`}><b>{element.title}</b></Link></td>
                                            <td>{element.description}</td>
                                            <td>{element.category}</td>
                                            <td className={`columna-prioridad${priorityColor}`}>{priorityText}</td>
                                            <td>{element.state}</td>
                                            <td>{element.limit_date}</td>
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