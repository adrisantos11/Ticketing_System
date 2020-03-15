import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './MostrarIncidenciasPage.scss'
import { Input } from '../../../../Components/Input/Input';
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel } from '../../../../Model/model'
import {getIncidenciasAssignedToUser} from '../../../../Utilities/IncidenciasUtilities'

const MostrarIncidenciasPage = () => {
    const [incidenciasLoaded, setIncidenciasLoaded] = React.useState(false);
    const [incidencias, setIncidencias] = React.useState([]);

    const user = {
        id: localStorage.userId
    }

    React.useEffect(() => {
        getIncidenciasAssignedToUser(user).then(res => {
            setIncidencias(res);
        })
        setIncidenciasLoaded(true);
    }, []);

    if(incidenciasLoaded) {
    return (
        <>
        <div className="perfilpage-container">
            <table className="table">
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
                            return(
                            <tr key={index}>
                                <th scope="row">{element.id}</th>
                                <td><a href="">{element.title}</a></td>
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