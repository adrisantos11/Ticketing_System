import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './FormularioIncidencia.scss'
import { Input } from '../../Components/Input/Input';
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel, TabsModel, FormularioIncidenciaModel } from '../../Model/model'
import Dropdown from '../../Components/Dropdown/Dropdown';
import Button from '../../Components/Button/Button';
import UploadFile from '../../Components/UploadFile/UploadFile';
import { createIncidencia } from '../../Utilities/Incidencias/IncidenciasUtilities'
import Tabs from '../../Components/Tabs/Tabs'
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";

interface Props {
    formularioProps: FormularioIncidenciaModel;
}

const FormularioIncidencia: React.FunctionComponent<Props> = (props: Props) => {
    const userRol = props.formularioProps.userRol;
    const widgetType = props.formularioProps.widgetType;
    const urlGeneral = props.formularioProps.urlGeneral;
    const history = useHistory();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [build, setBuild] = React.useState('');
    const [floor, setFloor] = React.useState(0);
    const [classroom, setClassroom] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [urlFile, setUrlFile] = React.useState('');

    let enableInput = true;
    let title1;
    let title2;
    let title3;
    let titleContainerType = '';
    let valueTitleInput = '';
    let valueDescriptionInput = '';
    let buttonText = '';

    if (widgetType == 'create') {
        title1 = <p className="p-title">¿Cuál es la incidencia?</p>;
        title2 = <p className="p-title">¿Dónde se produce la incidencia?</p>;
        title3 = <p className="p-title">¿De qué tipo es la incidencia?</p>;
        titleContainerType = '--row';
        buttonText = 'Crear incidencia';
    } else if (widgetType == 'edit') {
        title1 = '';
        title2 = '';
        title3 = '';
        titleContainerType = ''
        valueTitleInput = props.formularioProps.incidenciaData.title;
        valueDescriptionInput = props.formularioProps.incidenciaData.description;
        buttonText = 'Editar incidencia';
        
    }

    const [titleInput, setTitleInput] = React.useState<InputModel>({
        id: 1,
        value: valueTitleInput,
        label: 'Título',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: enableInput,
        inputSize: ''
    });
    const [descriptionInput, setDescriptionInput] = React.useState<InputModel>({
        id: 2,
        value: valueDescriptionInput,
        label: 'Descripción',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: enableInput,
        inputSize: ''
    });

    const [categoryDropdown, setCategoryDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: 'Elegir categoría',
        groupItems: ['Mobiliario', 'Wi-Fi', 'Red', 'Switch', 'Hardware', 'Software'],
        groupIds: ['Mobiliario', 'Wi-Fi', 'Red', 'Switch', 'Hardware', 'Software'],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    // groupItems: ['Edificio A (Salud)', 'Edificio B (Sociales)', 'Edificio C (Ingeniería y Diseño)', 'Polideportivo (Deporte)','Edificio E (Business)'],
    const [buildDropdown, setBuildDropdown] = React.useState<DropdownModel>({
        id: 2,
        groupName: 'Elegir edificio',
        groupItems: ['Edificio B (Sociales)', 'Edificio C (Ingeniería y Diseño)'],
        groupIds:['Edificio B (Sociales)', 'Edificio C (Ingeniería y Diseño)'],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [floorDropdown, setFloorDropdown] = React.useState<DropdownModel>({
        id: 3,
        groupName: 'Elegir piso',
        groupItems: [],
        groupIds: [],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [classDropdown, setClassDropdown] = React.useState<DropdownModel>({
        id: 4,
        groupName: 'Elegir aula',
        groupItems: [],
        groupIds: [],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [priorityDropdown, setPriorityDropdwn] = React.useState<DropdownModel>({
        id: 5,
        groupName: 'Elegir prioridad',
        groupItems: ['Crítica', 'Importante', 'Trivial'],
        groupIds: ['critical', 'important', 'trivial'],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });


    const [createIncidenciaButton] = React.useState<ButtonModel>({
        id: 1,
        texto: buttonText,
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'confirmationModal',  
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

    const handleChangeInput = (value: string, id: number) => {
        if(id == 1){
            setTitle(value);
        } else if (id == 2) {
            setDescription(value);
        }
    }

    const piso0_B = {
        nombre: 0,
        aulas: ['No hay aulas en este piso']
    }
    const piso1_B = {
        nombre: 1,
        aulas: ['B101','B102','B103','B104','B105','B106','B107','B108','B109','B110','B111','B112','B113','B114','B115','B116','B117','B118']
    }
    const piso2_B = {
        nombre: 2,
        aulas: ['B201','B202','B203','B204','B205','B206','B207','B208','B209','B210','B211','B212','B213','B214','B215','B216','B217','B218']
    }
    const piso3_B = {
        nombre: 3,
        aulas: ['B301','B302','B303','B304','B305','B306','B307','B308','B309','B310','B311','B312','B313','B314','B315','B316','B317','B318']
    }

    
    const edificioB = {
        nombre: 'Edificio A',
        pisos: [piso0_B, piso1_B, piso2_B, piso3_B]
    }

    const piso0_C = {
        nombre: 0,
        aulas: ['No hay aulas en este piso']
    }
    const piso1_C = {
        nombre: 1,
        aulas: ['C101','C102','C103','C104','C105','C106','C107','C108','C109','C110','C111','C112','C113','C114','C115','C116','C117','C118']
    }
    const piso2_C = {
        nombre: 2,
        aulas: ['C201','C202','C203','C204','C205','C206','C207','C208','C209','C210','C211','C212','C213','C214','C215','C216','C217','C218']
    }
    const piso3_C = {
        nombre: 3,
        aulas: ['C301','C302','C303','C304','C305','C306','C307','C308','C309','C310','C311','C312','C313','C314','C315','C316','C317','C318']
    }
    const edificioC = {
        nombre: 'Edificio A',
        pisos: [piso0_C, piso1_C, piso2_C, piso3_C]
    }

    const handleClickItemDD = (idItem: string, idDropdown: number) => {
        if (idDropdown == 1) {
            // Establece el valor elegido en el dropdown de categoría
            setCategory(idItem);
        } else if (idDropdown == 2) {
            // Establece el valor elegido en el dropdown de edificio (dropdown precargado)
            let arrayPisos: number[]= [];
            if (idItem.includes('Salud')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso A
                setBuild('A'); 
            } else if (idItem.includes('Sociales')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso B
                setBuild('B'); 
                edificioB.pisos.map(value => {
                    arrayPisos.push(value.nombre)
                })
            } else if (idItem.includes('Ingeniería')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso C
                setBuild('C');
                edificioC.pisos.map(value => {
                    arrayPisos.push(value.nombre)
                })
            } else if (idItem.includes('Deporte')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso P
                setBuild('P'); 
            } else if (idItem.includes('Business')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso E
                setBuild('E'); 
            }
            setFloorDropdown({
                ...floorDropdown,
                groupIds: arrayPisos,
                groupItems: arrayPisos
            })
        } else if (idDropdown == 3) {
            let arrayAulas: string[] = []
            setFloor(Number(idItem));
            if (build == 'A') {
            } else if (build == 'B') 
            {
                if (String(idItem).includes('0') ) {
                    piso0_B.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('1') ) {
                    piso1_B.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('2') ) {
                    piso2_B.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('3') ) {
                    piso3_B.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                }
            } else if(build == 'C'){
                console.log('Piso C seleccionado')
                if (String(idItem).includes('0') ) {
                    piso0_C.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('1') ) {
                    piso1_C.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('2') ) {
                    piso2_C.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('3') ) {
                    piso3_C.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                }
            } 
            setClassDropdown({
                ...classDropdown,
                groupIds: arrayAulas,
                groupItems: arrayAulas
            })
        } else if (idDropdown == 4) {
            setClassroom(String(idItem)); 
        } else if (idDropdown == 5) {
            setPriority(String(idItem)); 
        }
    }

    const fieldsValidation = (title: string, description: string, category: string, build: string, floor: number, classroom: string, priority: string) => {
        // console.log(floor);
        let validation = false;
        if(title != '') {
            if (title.length > 70) {
                setTitleInput({
                    ...titleInput,
                    error_control_text: 'El texto introducido excede los 70 caracteres. Tiene '+title.length+' caracteres.',
                    color: 'red'
                })
            } else {
                setTitleInput({
                    ...titleInput,
                    error_control_text: '',
                    color: 'primary'
                })
                validation = true
            }
        } else {
            setTitleInput({
                ...titleInput,
                error_control_text: 'No se ha introducido nningún dato.',
                color: 'red'
            })
        }

        if (description != '') {
            if (description.length > 240) {
                setDescriptionInput({
                    ...descriptionInput,
                    error_control_text: 'El texto introducido excede los 240 caracteres. Tiene '+description.length+' caracteres.',
                    color: 'red'
                })
            } else {
                setDescriptionInput({
                    ...descriptionInput,
                    error_control_text: '',
                    color: 'primary'
                })
                validation = true
            }
        } else {
            setDescriptionInput({
                ...descriptionInput,
                error_control_text: 'No se ha introducido ningún dato.',
                color: 'red'
            })
        }

        if (category != '') {
            setCategoryDropdown({
                ...categoryDropdown,
                color: 'primary'
            })
            validation = true
        } else {
            setCategoryDropdown({
                ...categoryDropdown,
                color: 'red'
            })
        }

        if (priority != '') {
            setPriorityDropdwn({
                ...priorityDropdown,
                color: 'primary'
            })
            validation = true
        } else {
            setPriorityDropdwn({
                ...priorityDropdown,
                color: 'red'
            })
        }

        if (build != '') {
            setBuildDropdown({
                ...buildDropdown,
                color: 'primary'
            })
            validation = true
        } else {
            setBuildDropdown({
                ...buildDropdown,
                color: 'red'
            })
        }

        if (floor != null) {
            setFloorDropdown({
                ...floorDropdown,
                color: 'primary'
            })
            validation = true
        } else {
            setFloorDropdown({
                ...floorDropdown,
                color: 'red'
            })
        }

        if (classroom != '') {
            setClassDropdown({
                ...classDropdown,
                color: 'primary'
            })
            validation = true
        } else {
            setClassDropdown({
                ...classDropdown,
                color: 'red'
            })
        }
        return validation;
    }

    const handleClickCreateIncidencia = (e: React.MouseEvent) => {
        console.log(e);
    }

    const handleClickConfirmIncidencia = (e: React.MouseEvent) => {
        if (fieldsValidation(title, description, category, build, floor, classroom, priority)) {
            let assignedUser, assignedTeam;
            if (userRol == 'supervisor') {
                assignedUser = null;
                assignedTeam = null;
            } else if (userRol == 'technical') {
                assignedUser = null;
                assignedTeam = null;
            }
            let date = new Date();
            let hoursMinutesSeconds = date.toLocaleString().split(' ');
            let currentDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + hoursMinutesSeconds[1];
            let incidencia: IncidenciaModel = {
                group_id: 0,
                id_reporter: parseInt(localStorage.userId),
                id_assigned: assignedUser,
                id_team: assignedTeam,
                title: title,
                description: description,
                category: category,
                build: build,
                floor: floor,
                class: classroom,
                url_data: '',
                creation_date: currentDate,
                limit_date: '1263645342',
                assigned_date: '',
                resolution_date: '',
                priority: priority,
                state: 'todo'
            }
            createIncidencia(incidencia);
            // if (widgetType == 'create') {
            //     history.push(urlGeneral+'/show');
            // }
        }
    }


    
    const assignUser = (userRol: string, url: string) => {
        const [tabsOptions] = React.useState<TabsModel>({
            idList: ['group','technical'],
            valuesList: ['Grupo de técnicos', 'Técnico'],
            color: 'primary',
            enabledList: [true, true],
            itemActive: null
        });

        const [groupsDropdown] = React.useState<DropdownModel>({
            id: 1,
            groupName: 'Elegir grupo',
            groupItems: ['Cargar', 'datos', 'de', 'base de datos 1'],
            groupIds: ['Cargar', 'datos', 'de', 'base de datos 1'],
            color: 'primary',
            enabled: false,
            extraClass: '',
        });

        const [technicalsDropdown] = React.useState<DropdownModel>({
            id: 2,
            groupName: 'Elegir técnico',
            groupItems: ['Cargar', 'datos', 'de', 'base de datos 2'],
            groupIds: ['Cargar', 'datos', 'de', 'base de datos 2'],
            color: 'primary',
            enabled: false,
            extraClass: '',
        });
        const handleClickTabsAssign = (id: string) => {
            if (id=='group') {
                console.log(`${url}/${widgetType}/assignGroup`);
                history.push(`${url}/${widgetType}/assignGroup`);
            } else if (id=='technical') {
                console.log(`${url}/${widgetType}/assignTechnical`);
                history.push(`${url}/${widgetType}/assignTechnical`);       
            }
        }

        const handleClickDropdowns = (idItem: string, idDropdown: number) => {
            console.log(idItem);
        }
        if (userRol == 'supervisor') {
            return(
                <>
                    <div className="data-container">
                        <p className="p-title">¿A quién se asigna la incidencia?</p>
                        <div className="asignacion-container">
                            <div className="assign-container">
                                <span>Asignar a</span>
                                <Tabs tabsInfo={tabsOptions} handleClick={handleClickTabsAssign}></Tabs>
                            </div>
                            <div className="dropdown-container">
                                <Switch>
                                    <Route path={`${url}/${widgetType}/assignGroup`}>
                                        <div>
                                            Elegir un grupo de técnicos:
                                            <Dropdown dropdownInfo={groupsDropdown} onClick={handleClickDropdowns}></Dropdown>
                                        </div>
                                    </Route>
                                    <Route path={`${url}/${widgetType}/assignTechnical`}>
                                        Elegir un técnico:
                                        <Dropdown dropdownInfo={technicalsDropdown} onClick={handleClickDropdowns}></Dropdown>
                                    </Route>
                                </Switch>     
                            </div>
                        </div>
                    </div>
                </>
            )
        } else if (userRol == 'technical') {
            console.log(userRol);
            return '';
        }

    }

    

    return (
        <>
        <div className='createIncidencia-container'>
            <div className={`data-container${titleContainerType}`}>
                <div className="title-container">
                    {title1}
                    <Input inputInfo={titleInput} handleChangeInput={handleChangeInput}></Input>
                    <Input inputInfo={descriptionInput} handleChangeInput={handleChangeInput}></Input>
                </div>
                <div className="dropdowns-container">
                    {title3}
                    <Dropdown dropdownInfo={categoryDropdown} onClick={handleClickItemDD}></Dropdown>
                    <Dropdown dropdownInfo={priorityDropdown} onClick={handleClickItemDD}></Dropdown>
                    <UploadFile></UploadFile>
                </div>
            </div>
            <div className="data-container">
                {title2}
                <div className="build-container">
                    <div className="dropdown-container">
                        <span>Edificio: <b>{build}</b></span>
                        <Dropdown dropdownInfo={buildDropdown} onClick={handleClickItemDD}></Dropdown>
                    </div>
                    <div className="dropdown-container">
                        <span>Piso: <b>{floor}</b></span>
                        <Dropdown dropdownInfo={floorDropdown} onClick={handleClickItemDD}></Dropdown>
                    </div>
                    <div className="dropdown-container">
                        <span>Aula: <b>{classroom}</b></span>
                        <Dropdown dropdownInfo={classDropdown} onClick={handleClickItemDD}></Dropdown>
                    </div>
                </div>
            </div>
            {
                assignUser(userRol, urlGeneral)
            }
            <div className="modal fade" id="confirmationModal" tabIndex={-1} role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="false">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">¿Seguro?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Pulse el botón de <b>'Confirmar'</b> si los cambios realizados en la incidencia son correctos.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <Button buttonInfo={confirmButton} handleClick={handleClickConfirmIncidencia}></Button>
                    </div>
                    </div>
                </div>
            </div>

            <Button buttonInfo={createIncidenciaButton} handleClick={handleClickCreateIncidencia}></Button>
            
        </div>
        </>
    )
}

export default FormularioIncidencia;