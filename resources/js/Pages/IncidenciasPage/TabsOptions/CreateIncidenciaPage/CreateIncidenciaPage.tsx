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
    const [titleInput] = React.useState<InputModel>({
        id: 1,
        label: 'Título',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: enableInput,
        extraClass: ''
    });
    const [descriptionInput] = React.useState<InputModel>({
        id: 2,
        label: 'Descripción',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: enableInput,
        extraClass: ''
    });

    const [departamentInput] = React.useState<InputModel>({
        id: 3,
        label: 'Departamento',
        placeholder: '',
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
            <Input inputInfo={titleInput} handleChangeInput={handleChangeInput}></Input>
            <Input inputInfo={descriptionInput} handleChangeInput={handleChangeInput}></Input>
            <Input inputInfo={departamentInput} handleChangeInput={handleChangeInput}></Input>
        </div>
        </>
    )
}

export default CreateIncidenciaPage;