import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './SettingsPage.scss'
import { Input } from '../../../Components/Input/Input'
import { InputModel, ButtonModel } from '../../../Model/model';
import Button from '../../../Components/Button/Button';
import { saveNewName, saveNewMail, saveNewPassword } from '../../../Utilities/Authentication';

const SettingsPage = (props: any) => {
    const userId = localStorage.userId;
    const userRol = localStorage.userRol;

    const [inputName, setInputName] = React.useState<InputModel>({
        id: 1,
        value: null,
        label: '',
        labelColor: 'primary',
        placeholder: 'Introducir el nuevo nombre',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [inputSurname1, setInputSurname1] = React.useState<InputModel>({
        id: 2,
        value: null,
        label: '',
        labelColor: 'primary',
        placeholder: 'Introducir primer apellido',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    })

    const [inputSurname2, setInputSurname2] = React.useState<InputModel>({
        id: 3,
        value: null,
        label: '',
        labelColor: 'primary',
        placeholder: 'Introducir segundo apellido',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    })

    const [inputEmail, setInputEmail] = React.useState<InputModel>({
        id: 4,
        value: null,
        label: '',
        labelColor: 'primary',
        placeholder: 'Introducir nuevo e-mail',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    })

    const [passwordInput, setPasswordInput] = React.useState<InputModel>({
        id: 5,
        value: null,
        label: '',
        labelColor: 'primary',
        placeholder: 'Introducir nueva contraseña',
        color: 'primary',
        type: 'password',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    })

    const [confirmPasswordInput, setConfirmPasswordInput] = React.useState<InputModel>({
        id: 6,
        value: null,
        label: '',
        labelColor: 'primary',
        placeholder: 'Confirmar nueva contraseña',
        color: 'primary',
        type: 'password',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    })

    // fas fa-user-edit
    const [saveNameButton, setSaveNameButton] = React.useState<ButtonModel>({
        id: 7,
        texto: 'Guardar nombre',
        color: 'primary',
        type: 'outline-primary',
        icon: '',
        target_modal: null,
        extraClass: null
    })

    const [saveEmailButton, setSaveEmailButton] = React.useState<ButtonModel>({
        id: 8,
        texto: 'Guardar e-mail',
        color: 'primary',
        type: 'outline-primary',
        icon: '',
        target_modal: null,
        extraClass: null
    })

    const [savePasswordButton, setSavePasswordButton] = React.useState<ButtonModel>({
        id: 9,
        texto: 'Guardar constraseña',
        color: 'primary',
        type: 'outline-primary',
        icon: '',
        target_modal: null,
        extraClass: null
    })

    const handleChangeInput = (value: string, id: number): void => {
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
            setInputEmail({
                ...inputEmail,
                value: value
            })
        } else if (id == 5) {
            setPasswordInput({
                ...passwordInput,
                value: value
            })
        } else if (id == 6) {
            setConfirmPasswordInput({
                ...confirmPasswordInput,
                value: value
            })
        }
    }

    const handleClickSaveChanges = (e: any, id: number) => {
        let isValid = true;
        if (id == 7) {
            if (inputName.value == '' || inputName.value == null) {
                setInputName({
                    ...inputName,
                    color: 'red',
                    error_control_text: 'El campo está vacío'
                })
                isValid = false;
            } else {
                setInputName({
                    ...inputName,
                    color: 'primary',
                    error_control_text: ''
                })

            }
            if (inputSurname1.value == '' || inputSurname1.value == null) {
                setInputSurname1({
                    ...inputSurname1,
                    color: 'red',
                    error_control_text: 'El campo está vacío'
                })
                isValid = false;
            } else {
                setInputSurname1({
                    ...inputSurname1,
                    color: 'primary',
                    error_control_text: ''
                })
            }
            if (inputSurname2.value == '' || inputSurname2.value == null) {     
                setInputSurname2({
                    ...inputSurname2,
                    color: 'red',
                    error_control_text: 'El campo está vacío'
                })
                isValid = false;
            } else {
                setInputSurname2({
                    ...inputSurname2,
                    color: 'primary',
                    error_control_text: ''
                })
            }
            if (isValid) {
                saveNewName(userId, inputName.value, inputSurname1.value, inputSurname2.value);
                props.changeUserValues(1, inputName.value, inputSurname1.value, inputSurname2.value)    
            }    
        } else if(id == 8) {
            if (inputEmail.value == '' || inputEmail.value == null) {     
                setInputEmail({
                    ...inputEmail,
                    color: 'red',
                    error_control_text: 'El campo está vacío'
                })
                isValid = false;
            } else {
                setInputEmail({
                    ...inputEmail,
                    color: 'primary',
                    error_control_text: ''
                })
            }
            if (isValid) {
                saveNewMail(userId, inputEmail.value);
                props.changeUserValues(2, inputEmail.value)
            }
        } else if(id == 9) {
            if (passwordInput.value == '' || passwordInput.value == null) {     
                setPasswordInput({
                    ...passwordInput,
                    color: 'red',
                    error_control_text: 'El campo está vacío'
                })
                isValid = false;
            } else {
                setPasswordInput({
                    ...passwordInput,
                    color: 'primary',
                    error_control_text: ''
                })
            }

            if (confirmPasswordInput.value == '' || confirmPasswordInput.value == null) {     
                setConfirmPasswordInput({
                    ...confirmPasswordInput,
                    color: 'red',
                    error_control_text: 'El campo está vacío'
                })
                isValid = false;
            } else {
                setConfirmPasswordInput({
                    ...confirmPasswordInput,
                    color: 'primary',
                    error_control_text: ''
                })
            }

            if (confirmPasswordInput.value != passwordInput.value) {
                setPasswordInput({
                    ...passwordInput,
                    color: 'red',
                    error_control_text: 'Las contraseñas no coinciden'
                })
                setConfirmPasswordInput({
                    ...confirmPasswordInput,
                    color: 'red',
                    error_control_text: ''
                })
                isValid = false;
            } else {
                setConfirmPasswordInput({
                    ...confirmPasswordInput,
                    color: 'primary',
                    error_control_text: ''
                })
                setPasswordInput({
                    ...passwordInput,
                    color: 'primary',
                    error_control_text: ''
                })
            }

            if (isValid) {
                saveNewPassword(userId, passwordInput.value);
            } else {
                setPasswordInput({
                    ...passwordInput,
                    color: 'red',
                    error_control_text: 'Los campos están vacíos'
                })
                setConfirmPasswordInput({
                    ...confirmPasswordInput,
                    color: 'red',
                    error_control_text: ''
                })
                isValid = false;
            }
        }
    }
    
    return (
        <div className="settings-container">
            <p className="title-edit"><b>Editar perfil</b></p>
            <div className="name-section">
                <p className='title-section'>Editar nombre</p>
                <div className="edit-name">
                    <Input inputInfo={inputName} handleChangeInput={handleChangeInput} ></Input>
                    <Input inputInfo={inputSurname1} handleChangeInput={handleChangeInput} ></Input>
                    <Input inputInfo={inputSurname2} handleChangeInput={handleChangeInput} ></Input>
                </div>
                <Button buttonInfo={saveNameButton} handleClick= {handleClickSaveChanges}></Button>
            </div>
            <div className="email-section">
                <p className='title-section'>Editar e-mail</p>
                <div className="edit-password">
                    <Input inputInfo={inputEmail} handleChangeInput={handleChangeInput} ></Input>
                </div>
                <Button buttonInfo={saveEmailButton} handleClick= {handleClickSaveChanges}></Button>
            </div>
            <div className="password-section">
                <p className='title-section'>Editar constraseña</p>
                <div className="edit-password">
                    <Input inputInfo={passwordInput} handleChangeInput={handleChangeInput} ></Input>
                    <Input inputInfo={confirmPasswordInput} handleChangeInput={handleChangeInput} ></Input>
                </div>
                <Button buttonInfo={savePasswordButton} handleClick= {handleClickSaveChanges}></Button>
            </div>
        </div>
    )
}

export default SettingsPage;