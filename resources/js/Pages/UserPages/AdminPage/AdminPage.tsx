import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './AdminPage.scss'
import { FormularioIncidenciaModel, InputModel, DropdownModel, ButtonModel } from '../../../Model/model';
import { Input } from '../../../Components/Input/Input';
import Dropdown from '../../../Components/Dropdown/Dropdown';
import Button from '../../../Components/Button/Button';
import { register, registerUser } from '../../../Utilities/Authentication';

const AdminPage = () => {
    const [inputName, setInputName] = React.useState<InputModel>({
        id: 1,
        value: '',
        label: 'Nombre',
        labelColor: 'primary',
        placeholder: 'Introducir nombre...',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [inputSurname1, setInputSurname1] = React.useState<InputModel>({
        id: 2,
        value: '',
        label: 'Primer apellido',
        labelColor: 'primary',
        placeholder: 'Introducir primer apellido...',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [inputSurname2, setInputSurname2] = React.useState<InputModel>({
        id: 3,
        value: '',
        label: 'Segundo apellido',
        labelColor: 'primary',
        placeholder: 'Introducir segundo apellido...',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [inputExp, setInputExp] = React.useState<InputModel>({
        id: 4,
        value: '',
        label: 'ID o Expediente',
        labelColor: 'primary',
        placeholder: 'Introducir ID o expediente...',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [inputPassword, setInputPassword] = React.useState<InputModel>({
        id: 5,
        value: '',
        label: 'Constraseña',
        labelColor: 'primary',
        placeholder: 'Introducir constraseña...',
        color: 'primary',
        type: 'password',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [inputConfirmPassword, setInputConfirmPassword] = React.useState<InputModel>({
        id: 6,
        value: '',
        label: 'Confirmar contraseña',
        labelColor: 'primary',
        placeholder: 'Confirmar contraseña...',
        color: 'primary',
        type: 'password',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [inputEmail, setInputEmail] = React.useState<InputModel>({
        id: 7,
        value: '',
        label: 'E-mail',
        labelColor: 'primary',
        placeholder: 'Introducir e-mail...',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [inputTlfn, setInputTlfn] = React.useState<InputModel>({
        id: 8,
        value: '',
        label: 'Teléfono de contacto',
        labelColor: 'primary',
        placeholder: 'Introducir teléfono...',
        color: 'primary',
        type: 'number',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [rolDropdown, setRolDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: 'Rol',
        groupItems: ['Admin', 'Supervisor', 'Técnico', 'Visitante'],
        groupIds: ['admin', 'supervisor', 'technical', 'visitor'],
        color: 'primary',
        enabled: true,
        extraClass: '',
    });

    const [createIncidenciaButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Crear usuario',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'',  
        extraClass: ''
    });

    const [userRol, setUserRol] = React.useState(null);
    const handleChangeInput = (value: string, id: number) => {
        if (id == 1) {
            setInputName({
                ...inputName,
                value: value
            })
        } else if (id == 2) {
            setInputSurname1({
                ...inputSurname1,
                value: value
            })
        } else if (id == 3) {
            setInputSurname2({
                ...inputSurname2,
                value: value
            })
        } else if (id == 4) {
            setInputExp({
                ...inputExp,
                value: value
            })
        } else if (id == 5) {
            setInputPassword({
                ...inputPassword,
                value: value
            })
        } else if (id == 6) {
            setInputConfirmPassword({
                ...inputConfirmPassword,
                value: value
            })
        } else if (id == 7) {
            setInputEmail({
                ...inputEmail,
                value: value
            })
        } else if (id == 8) {
            setInputTlfn({
                ...inputTlfn,
                value: value
            })
        }
    }

    const handleClickItemDD = (idItem: string, idDropdown: number) => {
        setUserRol(idItem);
    }

    const handleClickCreateUser = () => {
        const user = {
            name: inputName.value,
            surname1: inputSurname1.value,
            surname2: inputSurname2.value,
            exp: inputExp.value,
            email: inputEmail.value,
            password: inputPassword.value,
            phone: inputTlfn.value,
            role: userRol
        }
        registerUser(user).then(res => {
            console.log(res);
        });
    }

    return(
        <div className="adminpage-container">
            <p className="title1"><i className="fas fa-user-plus"></i><b>  Crear nuevo usuario</b></p>
            Admin page
            <div className="formulario-container">
                <div className="h-container">
                    <Input inputInfo={inputName} handleChangeInput={handleChangeInput}></Input>
                    <Input inputInfo={inputSurname1} handleChangeInput={handleChangeInput}></Input>
                    <Input inputInfo={inputSurname2} handleChangeInput={handleChangeInput}></Input>
                </div>
                <Input inputInfo={inputExp} handleChangeInput={handleChangeInput}></Input>
                <div className="h-container">
                    <Input inputInfo={inputPassword} handleChangeInput={handleChangeInput}></Input>
                    <Input inputInfo={inputConfirmPassword} handleChangeInput={handleChangeInput}></Input>
                </div>
                <Input inputInfo={inputEmail} handleChangeInput={handleChangeInput}></Input>

                <div className="h-container--2">
                    <Input inputInfo={inputTlfn} handleChangeInput={handleChangeInput}></Input>
                    <Dropdown dropdownInfo={rolDropdown} onClick={handleClickItemDD}></Dropdown>
                </div>
                <Button buttonInfo={createIncidenciaButton} handleClick={handleClickCreateUser}></Button>

            </div>
        </div>
    )
}

export default AdminPage;