import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './CreateIncidenciaPage.scss'
import { Input } from '../../../../Components/Input/Input';
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel } from '../../../../Model/model'

const CreateIncidenciaPage = () => {
    let userRol = localStorage.userRol;
    let enableInput = true;
    if(userRol == 'technical') {
        enableInput = false;
    }
    const [assignInput] = React.useState<InputModel>({
        id: 1,
        label: 'Asignar a...',
        placeholder: 'Ej: 25342783',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: enableInput,
        extraClass: ''
    });

    const handleChangeInput = (value: string, id: number) => {
        // console.log(value);
    }

    return (
        <>
        <div className="perfilpage-container">
            Crear incidencia.
            <Input inputInfo={assignInput} handleChangeInput={handleChangeInput}></Input>
        </div>
        </>
    )
}

export default CreateIncidenciaPage;