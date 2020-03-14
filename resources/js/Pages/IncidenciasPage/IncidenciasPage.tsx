import * as ReactDOM from 'react-dom';
import * as React from 'react'
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";
import './IncidenciasPage.scss'
import {getIncidenciasAssignedToUser} from '../../Utilities/Incidencias'
import {IncidenciaModel} from '../../Model/model';

const IncidenciasPage = () => {
    const user = {
        id: localStorage.userId
    }

    const [incidenciasLoaded, setIncidenciasLoaded] = React.useState(false);
    const [incidencias, setIncidencias] = React.useState([]);
    React.useEffect(() => {
        getIncidenciasAssignedToUser(user).then(res => {
            setIncidencias(res.data);
        })
        setIncidenciasLoaded(true);
    }, []);

    if(incidenciasLoaded) {
        return( 
            <div>
                ID del usuario: <b>{localStorage.userId}</b>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Título</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Prioridad</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha límite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            incidencias.map(element => {
                                return(
                                    <tr>
                                    <th scope="row">{element.id}</th>
                                    <td>{element.title}</td>
                                    <td>{element.description}</td>
                                    <td>{element.category}</td>
                                    <td>{element.priority}</td>
                                    <td>{element.state}</td>
                                    <td>{element.limit_date}</td>
                                </tr>
                                )
                            }) 
                        }
                    </tbody>
                </table>
            </div>
        )
    } else {
        return(
            <div>
                No se han cargado las incidencias.
            </div>
        )
    }
}

export default IncidenciasPage;