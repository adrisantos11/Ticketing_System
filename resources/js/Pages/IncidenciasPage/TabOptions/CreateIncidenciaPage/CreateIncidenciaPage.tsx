import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './CreateIncidenciaPage.scss'
import { Input } from '../../../../Components/Input/Input';
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel, FormularioIncidenciaModel } from '../../../../Model/model'
import Dropdown from '../../../../Components/Dropdown/Dropdown';
import Button from '../../../../Components/Button/Button';
import UploadFile from '../../../../Components/UploadFile/UploadFile';
import { createIncidencia } from '../../../../Utilities/Incidencias/IncidenciasUtilities'
import FormularioIncidencia from '../../../../Widgets/FormularioIncidencia/FormularioIncidencia';

const CreateIncidenciaPage = () => {
    
    const [formularioIncidencia, setFormularioIncidencia] = React.useState<FormularioIncidenciaModel>({
        widgetType: 'create',
        userRol: localStorage.userRol,
        urlGeneral: `/home/incidencias`,
        incidenciaData: null
    });

    return (
        <div className="createIncidencia-container">
            <div className='info-container'>
                Apartado para <b>crear una incidencia</b>. Deberá rellenar correctamente todos los campos para la correcta creación de la incidencia.
            </div>
            <FormularioIncidencia formularioProps={formularioIncidencia}></FormularioIncidencia>
        </div>
        
    )
}

export default CreateIncidenciaPage;