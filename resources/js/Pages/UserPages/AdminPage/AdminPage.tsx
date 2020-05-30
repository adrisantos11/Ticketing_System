import * as ReactDOM from 'react-dom';
import * as React from 'react'
import * as XLSX from 'xlsx';
import './AdminPage.scss'
import { FormularioIncidenciaModel, InputModel, DropdownModel, ButtonModel, ModalModel } from '../../../Model/model';
import { Input } from '../../../Components/Input/Input';
import Dropdown from '../../../Components/Dropdown/Dropdown';
import Button from '../../../Components/Button/Button';
import { registerUser, getAllUsers, importUserExcel } from '../../../Utilities/Authentication';
import Modal from '../../../Components/Modal/Modal';

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

    const [importExcelButton] = React.useState<ButtonModel>({
        id: 2,
        texto: 'Importar',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'',  
        extraClass: ''
    });
    
    const [confirmButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Confirmar',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'confirmationModal',  
        extraClass: ''
    });

    const [modalCreateUser] = React.useState<ModalModel>({
        id: 'confirmationModal',
        title: '¿Seguro?',
        buttonProps: confirmButton,
        enableCloseButton: true,
        infoModel: false
    })
    const [userRol, setUserRol] = React.useState(null);

    const handleErrors = (): boolean => {
        let isValid = true;
        if (inputName.value == '') {
            setInputName({
                ...inputName,
                value: '',
                color: 'red',
                error_control_text: 'El campo se encuentra vacío.'
            })
            isValid = false;
        } else {
            setInputName({
                ...inputName,
                color: 'primary',
                error_control_text: ''
            })
        }
        
        if (inputSurname1.value == '') {
            setInputSurname1({
                ...inputSurname1,
                value: '',
                color: 'red',
                error_control_text: 'El campo se encuentra vacío.'
            })

            isValid = false;
        } else {
            setInputSurname1({
                ...inputSurname1,
                color: 'primary',
                error_control_text: ''
            })
        }

        if (inputSurname2.value == '') {
            setInputSurname2({
                ...inputSurname2,
                value: '',
                color: 'red',
                error_control_text: 'El campo se encuentra vacío.'
            })
            isValid = false;

        } else {
            setInputSurname2({
                ...inputSurname2,
                color: 'primary',
                error_control_text: ''
            })
        }

        if (inputExp.value == '') {
            setInputExp({
                ...inputExp,
                value: '',
                color: 'red',
                error_control_text: 'El campo se encuentra vacío.'
            })
            isValid = false;

        } else {
            setInputExp({
                ...inputExp,
                color: 'primary',
                error_control_text: ''
            })
        }

        if (inputPassword.value == '') {
            setInputPassword({
                ...inputPassword,
                value: '',
                color: 'red',
                error_control_text: 'El campo se encuentra vacío.'
            })
            isValid = false;
            
        } else {
            setInputPassword({
                ...inputPassword,
                color: 'primary',
                error_control_text: ''
            })
        }

        if (inputConfirmPassword.value == '') {
            setInputConfirmPassword({
                ...inputConfirmPassword,
                value: '',
                color: 'red',
                error_control_text: 'El campo se encuentra vacío.'
            })
            isValid = false;

        } else if (inputConfirmPassword.value != inputPassword.value) {
            setInputPassword({
                ...inputPassword,
                value: '',
                color: 'red',
                error_control_text: 'Las constraseñas no coinciden.'
            })

            setInputConfirmPassword({
                ...inputConfirmPassword,
                value: '',
                color: 'red',
                error_control_text: ''
            })
            isValid = false;

        } else {
            setInputPassword({
                ...inputPassword,
                color: 'primary',
                error_control_text: ''
            })

            setInputConfirmPassword({
                ...inputConfirmPassword,
                color: 'primary',
                error_control_text: ''
            })
        }

        if (inputEmail.value == '') {
            setInputEmail({
                ...inputEmail,
                value: '',
                color: 'red',
                error_control_text: 'El campo se encuentra vacío.'
            })
            isValid = false;

        } else {
            setInputEmail({
                ...inputEmail,
                color: 'primary',
                error_control_text: ''
            }) 
        }

        if (inputTlfn.value == '') {
            setInputTlfn({
                ...inputTlfn,
                value: '',
                color: 'red',
                error_control_text: 'El campo se encuentra vacío.'
            })
            isValid = false;

        } else {
            setInputTlfn({
                ...inputTlfn,
                color: 'primary',
                error_control_text: ''
            }) 
        }

        if(userRol == null) {
            setRolDropdown({
                ...rolDropdown,
                color: 'red'
            })
            isValid = false;

        } else {
            setRolDropdown({
                ...rolDropdown,
                color: 'primary'
            })
        }
        return isValid;
    }

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

    const handleClickItemDD = (idItem: string, nameSelected: string) => {
        setRolDropdown({
            ...rolDropdown,
            groupName: nameSelected,
        })
        setUserRol(idItem);
    }

    const handleClickCreateUser = (e: React.MouseEvent , id: number) => {
        console.log(id);
        if (id == 1) {
            const fieldsCorrect = handleErrors();
            if (fieldsCorrect) {            
                $('#'+modalCreateUser.id).modal('show'); 
                
            }
            
        } else if (id == 2) {
            console.log('Importar datos...')
        }
    }

    const handleClickConfirmIncidencia = () => { 
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

        $('#'+modalCreateUser.id).modal('hide'); 
        $('#toastCreateUser').show();
        $('#toastCreateUser').toast('show');

        setInputName({
            ...inputName,
            value: ''
        })

        setInputSurname1({
            ...inputSurname1,
            value: '',
        })

        setInputSurname2({
            ...inputSurname2,
            value: '',
        })

        setInputExp({
            ...inputExp,
            value: '',
        })

        setInputPassword({
            ...inputPassword,
            value: '',
        })

        setInputConfirmPassword({
            ...inputConfirmPassword,
            value: '',
        })

        setInputEmail({
            ...inputEmail,
            value: '',
        })

        setInputTlfn({
            ...inputTlfn,
            value: '',
        })

    }

    const [newUserList, setNewUserList] = React.useState([]);
    const onChangeFileInput = (e: any) => {
        readExcel(e.target.files[0]);
    }
    const [userObject, setUserObject] = React.useState(null);
    function readExcel(file: any) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let data = e.target.result;
            let workbook = XLSX.read(data, {
              type: 'binary'
            });
            let sheetName = workbook.SheetNames[0];
            let xlsx_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            console.log(xlsx_object);
            // const userObjectExcel = JSON.stringify(XL_row_object);
            // console.log(e.target.files[0]);
            const helperList: any[] = [];
            const helperList2: any[] = [];
            getAllUsers().then(res => {
                res.map((exp: { exp: any; }) => {
                    helperList.push(Number(exp.exp));
                })
                xlsx_object.map((newUser: { exp: any; }) => {
                    const encontrado = helperList.indexOf(newUser.exp);
                    if (encontrado == -1) {
                        helperList2.push(newUser)
                    }
                })
                if (helperList2.length != 0) {
                    importUserExcel(helperList2)
                } else {
                    console.log("No hay datos nuevos para guardar.")
                }
            })

          };
      
          reader.onerror = function(ex) {
            console.log(ex);
          };
      
          reader.readAsBinaryString(file);
       
      }

    return(
        <div className="adminpage-container">
            <p className="title1"><i className="fas fa-user-plus"></i><b>  Crear nuevo usuario</b></p>
            <p>Siendo rol <b>ADMINISTRADOR</b>, podrá crear tantos usuarios como desee.</p>
            <p>Para ello es necesario que rellene el siguiente formulario correctamente.</p>
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
            <div className="import-container">
                <p className='import-title'><b>Importar usuarios desde EXCEL</b></p>
                Para que el excel se importe correctamente es necesario que tenga una cabecera con los siguientes datos como columnas independientes:
                <ul>
                    <li><b>name</b>: Nombre del usuario.</li>
                    <li><b>surname1</b>: Primer apellido del usuario.</li>
                    <li><b>surname1</b>:Segundo apellido del usuario.</li>
                    <li><b>exp</b>: Expedinete o ID del usuario.</li>
                    <li><b>email</b>: Email del usuario.</li>
                    <li><b>password</b>: Constraseña del usuario.</li>
                    <li><b>phone</b>: Nº de teléfono del usuario.</li>
                    <li><b>rol</b>: Rol del usuario.</li>
                </ul>
                <input type="file" onChange={onChangeFileInput} accept=".xlsx"/>
            </div>
            <Modal modalProps={modalCreateUser} onClick={handleClickConfirmIncidencia}>
                <p>Pulse el botón de <b>'Confirmar'</b> si los datos introducidos son correctos.</p>
                <p>Nombre: <b>{inputName.value}</b></p>
                <p>Primer apellido: <b>{inputSurname1.value}</b></p>
                <p>Segundo apellido: <b>{inputSurname2.value}</b></p>
                <p>Expediente o ID: <b>{inputExp.value}</b></p>
                <p>E-mail: <b>{inputEmail.value}</b></p>
                <p>Teléfono: <b>{inputTlfn.value}</b></p>
                <p>Rol: <b>{rolDropdown.groupName}</b></p>
            </Modal>

        </div>
    )
}

export default AdminPage;