import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './MostrarIncidenciasPage.scss'
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel, SelectboxModel } from '../../../../Model/model'
import Dropdown from '../../../../Components/Dropdown/Dropdown';
import Selectbox from '../../../../Components/Selectbox/SelectBox';
import { NavLink, Link } from 'react-router-dom';

import { getIncidenciasAssignedToUser } from '../../../../Utilities/Incidencias/IncidenciasUtilities'
import { getTechnicalIncidencias } from '../../../../Utilities/Incidencias/TechnicalUtilities'
import { getSupervisorIncidencias } from '../../../../Utilities/Incidencias/SupervisorUtilities'

const MostrarIncidenciasPage = () => {
    const [incidenciasLoaded, setIncidenciasLoaded] = React.useState(false);
    const [incidencias, setIncidencias] = React.useState([]);
    let priorityText='';
    let priorityColor='';
    const userRol = localStorage.userRol;
    const [orderBy, setOrderBy] = React.useState('state');
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
        groupName: "Estado",
        groupItems: dropdownItems,
        groupIds: dropdownIds,
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [selectboxActive, setSelectboxActive] = React.useState<SelectboxModel>({
        active: true,
        name: 'Pendientes',
        id: 'todo'
    });

    const [selectboxDisabled, setSelectboxDisabled] = React.useState<SelectboxModel>({
        active: false,
        name: 'Pendientes',
        id: 'todo'
    });

    const getIncidenciasUser = (user: any, orderBy: string) => {
        if (userRol == 'technical') {
            getTechnicalIncidencias(user, orderBy).then(res => {
                setIncidencias(res);
            })
        } else if (userRol == 'supervisor'){
            getSupervisorIncidencias(user, orderBy).then(res => {
                setIncidencias(res);
            })
        }
    }

    React.useEffect(() => {
        getIncidenciasUser(user, orderBy);
        setIncidenciasLoaded(true);
    }, [orderBy]);

    const handleClickItemDD = (idItem: string, idDropdown: number) => {
        setOrderBy(idItem);
    }

    const handleClickSelectedbox = (id: string) => {
        console.log(id);
    }


    if(incidenciasLoaded && userRol=='supervisor') {
        return (
            <>
            <div className="incidenciasList-container">
                <div className="filtrar-container">
                    <Dropdown dropdownInfo={adminDropdown} onClick={handleClickItemDD}></Dropdown>
                    <Selectbox selectboxInfo={selectboxActive} handleClickSelectbox={handleClickSelectedbox}></Selectbox>
                    <Selectbox selectboxInfo={selectboxDisabled} handleClickSelectbox={handleClickSelectedbox}></Selectbox>
                    <Selectbox selectboxInfo={selectboxDisabled} handleClickSelectbox={handleClickSelectedbox}></Selectbox>
                    <Selectbox selectboxInfo={selectboxDisabled} handleClickSelectbox={handleClickSelectedbox}></Selectbox>
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
            </div>
            </>
        )
        } else if (incidenciasLoaded && userRol=='technical') {
            return (
                <>
                <div className="incidenciasList-container">
                    <div className="filtrar-container">
                        <Dropdown dropdownInfo={adminDropdown} onClick={handleClickItemDD}></Dropdown>
                        <Selectbox selectboxInfo={selectboxActive} handleClickSelectbox={handleClickSelectedbox}></Selectbox>
                        <Selectbox selectboxInfo={selectboxDisabled} handleClickSelectbox={handleClickSelectedbox}></Selectbox>
                        <Selectbox selectboxInfo={selectboxDisabled} handleClickSelectbox={handleClickSelectedbox}></Selectbox>
                        <Selectbox selectboxInfo={selectboxDisabled} handleClickSelectbox={handleClickSelectedbox}></Selectbox>
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
    
        }else {
            return(
                <div>
                    No se han cargado las incidencias.
                </div>
            )
    }

}

export default MostrarIncidenciasPage;