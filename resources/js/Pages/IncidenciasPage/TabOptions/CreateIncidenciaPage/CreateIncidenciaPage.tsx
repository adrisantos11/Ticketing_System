import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './CreateIncidenciaPage.scss'
import { Input } from '../../../../Components/Input/Input';
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel } from '../../../../Model/model'
import Dropdown from '../../../../Components/Dropdown/Dropdown';
import Button from '../../../../Components/Button/Button';
import UploadFile from '../../../../Components/UploadFile/UploadFile';
import { createIncidencia } from '../../../../Utilities/Incidencias/IncidenciasUtilities'
import FormularioIncidencia from '../../../../Widgets/FormularioIncidencia/FormularioIncidencia';

const CreateIncidenciaPage = () => {

    return (
        <FormularioIncidencia widgetType='create' userRol={localStorage.userRol} urlGeneral='/home/incidencias'></FormularioIncidencia>
    )
}

export default CreateIncidenciaPage;