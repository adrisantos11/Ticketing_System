import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './IncidenciaViewPage.scss'
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel } from '../../../Model/model'
import { createIncidencia } from '../../../Utilities/IncidenciasUtilities'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const IncidenciaViewPage = () => {
    let {idIncidencia} = useParams();
    return(
        <div className='incidenciaview-container'>
            <p>Vista inciencia única. <b>{idIncidencia}</b></p>
            <Link to='/home/incidencias/show'>Volver a la página anterior</Link>
        </div>
    )
}

export default IncidenciaViewPage;