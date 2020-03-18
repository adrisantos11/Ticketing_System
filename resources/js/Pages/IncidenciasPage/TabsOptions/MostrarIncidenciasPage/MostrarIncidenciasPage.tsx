import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './MostrarIncidenciasPage.scss'
import { Input } from '../../../../Components/Input/Input';
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel } from '../../../../Model/model'
import {getIncidenciasAssignedToUser} from '../../../../Utilities/IncidenciasUtilities'
import Dropdown from '../../../../Components/Dropdown/Dropdown';

const MostrarIncidenciasPage = () => {
    const [incidenciasLoaded, setIncidenciasLoaded] = React.useState(false);
    const [incidencias, setIncidencias] = React.useState([]);
    let priorityText='';
    let priorityColor='';

    const user = {
        id: localStorage.userId
    }
    
    const [adminDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: "Ordenar por...",
        groupItems: ['Prioridad', 'Fecha límite', 'Estado'],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    React.useEffect(() => {
        getIncidenciasAssignedToUser(user).then(res => {
            setIncidencias(res);
        })
        setIncidenciasLoaded(true);
    }, []);

    const handleClickItemDD = (id: number) => {
        console.log(id);
    }

    if(incidenciasLoaded) {
    return (
        <>
        <div className="incidenciasList-container">
            <div className="filtrar-container">
                <Dropdown dropdownInfo={adminDropdown} onClick={handleClickItemDD}></Dropdown>
            </div>
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
                                <td><a href={`/home/incidencias/show-${element.id}`}>{element.title}</a></td>
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