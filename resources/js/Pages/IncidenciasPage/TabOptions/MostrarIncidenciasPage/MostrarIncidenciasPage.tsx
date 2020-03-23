import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './MostrarIncidenciasPage.scss'
import { Input } from '../../../../Components/Input/Input';
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel } from '../../../../Model/model'
import Dropdown from '../../../../Components/Dropdown/Dropdown';
import { NavLink, Link } from 'react-router-dom';

import { getIncidenciasAssignedToUser } from '../../../../Utilities/Incidencias/IncidenciasUtilities'
import { getTechnicalIncidencias } from '../../../../Utilities/Incidencias/TechnicalUtilities'

const MostrarIncidenciasPage = () => {
    const [incidenciasLoaded, setIncidenciasLoaded] = React.useState(false);
    const [incidencias, setIncidencias] = React.useState([]);
    let priorityText='';
    let priorityColor='';
    const userRol = localStorage.userRol;
    const [orderBy, setOrderBy] = React.useState('state');
    const user = {
        id: localStorage.userId
    }
    
    const [adminDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: "Ordenar por...",
        groupItems: ['Prioridad', 'Fecha límite', 'Estado', 'Categoría', 'ID'],
        groupIds: ['priority', 'limit_date', 'state', 'category', 'id'],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const getIncidenciasUser = (user: any, orderBy: string) => {
        if (userRol == 'technical') {
            getTechnicalIncidencias(user, orderBy).then(res => {
                setIncidencias(res);
            })
        } else {
            getIncidenciasAssignedToUser(user).then(res => {
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
        console.log(orderBy);
        // getIncidenciasUser(user, orderBy);
    }

    if(incidenciasLoaded) {
    return (
        <>
        <div className="incidenciasList-container">
            <div className="filtrar-container">
                <Dropdown dropdownInfo={adminDropdown} onClick={handleClickItemDD}></Dropdown>
            </div>
            <div className="table-container">
                <table className="table" id='dataTable'>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Prioridad</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Fecha límite</th>
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
                                    <td><Link to={`/home/incidencia-view/${element.id}`} data-toogle="tooltip" data-placement="top" title={`Incidencia ${element.id}`}><b>{element.title}</b></Link></td>
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